import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import axios from "axios";

const QueryDetail = () => {
   
    const {ticketdetail,setTicketDetail} = useUser();
    const {ticketcode} = useParams();
    const navigate = useNavigate();

    const getTicketDetail = async () => {
        try {
            
            const response = await axios.get(`http://127.0.0.1:8000/ticket/user/query-request/${ticketcode}`);
      
            console.log(response.data, "ticketdetail yoktu geldi");

            setTicketDetail(response.data);

      
        } catch (error) {
           
            navigate("/not-found");
      
        }
    };

    useEffect(() => {
   
        if (Object.keys(ticketdetail).length > 0) {
            console.log("ticketdetail değeri mevcut:", ticketdetail);
        } else {
            console.log("tickedetail değeri yok.");
            getTicketDetail();
        }
    },[]);


    const DateConverter = (date) => {

        const dateObject = new Date(date);
        const options = { 
            timeZone: "Europe/Istanbul", 
                   
            year: "numeric",             
            month: "2-digit",            
            day: "2-digit",              
                  
                  
        };

        const formattedDate = dateObject.toLocaleString("tr-TR", options);

        return formattedDate;
    };
   

    return (
        <div className="container p-5 my-5">
            <h2>Ticket Kodu: {ticketcode}</h2>

            <div className="queryboxmodel p-5 d-flex flex-column align-items-center justify-content-center gap-3">
                <div>
                    <label className="mb-2">Ad:</label>
                    <input value={ticketdetail.ticket_detail.name && ticketdetail.ticket_detail.name } className="form-control" disabled/>
               
                </div> 

                <div>
                    <label className="mb-2">Soyad:</label>
                    <input value={ticketdetail.ticket_detail.surname && ticketdetail.ticket_detail.surname } className="form-control" disabled/>
                </div> 

                <div>
                    <label className="mb-2">Başvuru Konusu:</label>
                    <input value={ticketdetail.ticket_detail.subject && ticketdetail.ticket_detail.subject } className="form-control" disabled/>
                </div> 

                <div>
                    <label className="mb-2">Başvuru Nedeni:</label>
                    <input value={ticketdetail.ticket_detail.complaint_reason && ticketdetail.ticket_detail.complaint_reason } className="form-control" disabled/>
                </div> 

                <div>
                    <label className="mb-2">Başvuru Tarihi:</label>
                    <input value={ticketdetail.ticket_detail.create_date && DateConverter(ticketdetail.ticket_detail.create_date) } className="form-control" disabled/>
                </div> 
            </div>

            <div className="container adminticketdetailcont text-center">      
                <h1 className="my-5 mt-5">Cevap Geçmişi</h1>  
                {ticketdetail.ticket_responses && ticketdetail.ticket_responses.map((item, index) => (
                    // Burada map içindeki JSX yapısını ekleyin

                    <div  className="my-5 responsesbox py-5 text-center" key={index}>
                        {   
                            <div>
                                <label className="color-green">Cevaplanma Tarihi:</label> 
                                <p >{DateConverter(item.create_date)}</p>
                                <label className="color-green">Cevap:</label>
                                <p>{item.response}</p>
                            </div>
                        }
       
                    </div>
   
                ))}
            </div>  

        </div>   
    );




};
 
 
    




export default QueryDetail;