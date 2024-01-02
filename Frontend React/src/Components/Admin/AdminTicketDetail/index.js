import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import validationsTicketDetail from "./validations";
import AdminTicketDetailForm from "./AdminTicketDetailForm";
import { toast } from "react-toastify";



const AdminTicketDetail = () => {
    
    const {ticketid} = useParams();
    const [ticketdetail,setTicketDetail] = useState();
    const [responsedata, setResponseData] = useState({response:"", create_date:""});
    
    
   
    const getTicketDetail = async () => {

        try {
            
            const response = await axios.get(`http://127.0.0.1:8000/ticket/admin/query-request/${ticketid}`);
      
            console.log("API yanıtı:", response.data);

            setTicketDetail(response.data);
          

        } catch (error) {
           
            if(error.response.status === 404) {
             
                console.log("ticketdetail bulunamadı.");

            }

            else {
            
                console.log("bir hata oluştu. lütfen daha sonra tekrar deneyin.");
            }

        }
    };


    useEffect(() => {

        getTicketDetail();

    },[]);
    
    

    const updateTicket = async (updatedData) => {

        try {
            const response = await axios.put(`http://127.0.0.1:8000/ticket/admin/update-request/${ticketid}`, updatedData);
            console.log("Güncelleme Başarılı:", response.data);
            toast.success("Güncelleme işlemi başarılı.");

        } catch (error) {

            if(error.response.status === 500) {
             
                console.log("güncelleme işlemi başarısız lütfen form değerlerini kontrol edin.");

            }

            else {
            
                console.log("bir hata oluştu. lütfen daha sonra tekrar deneyin.");
            }

        }

    };


    const sendResponse = async(responseData) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/ticket/admin/create-request/${ticketid}`, responseData);
            // İstek başarılıysa burada işlemler yapabilirsiniz
            console.log("İstek başarılı:", response.data);
            toast.success("Cevap başarıyla gönderildi.");
            
        } catch (error) {
            // İstek hatalıysa burada işlemler yapabilirsiniz
            console.error("İstek hatası:", error);
        }
    };


    const responseHandleSubmit = (e) => {
        e.preventDefault();
        const nowDateTime = new Date();   
        const year = nowDateTime.getFullYear();
        const month = String(nowDateTime.getMonth() + 1).padStart(2, "0");
        const day = String(nowDateTime.getDate()).padStart(2, "0");
        const hour = String(nowDateTime.getHours()).padStart(2, "0");
        const minute = String(nowDateTime.getMinutes()).padStart(2, "0");
        const second = String(nowDateTime.getSeconds()).padStart(2, "0");
        const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        responsedata.create_date = formattedDateTime;
        sendResponse(responsedata);
    };

  
    
    const {handleSubmit,handleChange,handleBlur,errors,touched,values,setValues} = useFormik({
        
        initialValues: {
            name: "",    
            surname: "",
            age: "",
            tc: "",
            subject: "",
            ticket_code: "",
            complaint_reason: "",
            address: "",
            status: "",
            createdate: "",
            
        },
        
        onSubmit: (values) => {

            console.log(values,"değerler geldi");
            updateTicket(values);
           
      
        },     
        validationSchema : validationsTicketDetail,
    
    });

    const DateConverter = (givenDateTimeStr) => {

        var givenDateTime = new Date(givenDateTimeStr);
        var turkeyTimeZone = "Europe/Istanbul";
        var options = { timeZone: turkeyTimeZone };
        var turkeyDateTimeStr = givenDateTime.toLocaleString("tr-TR", options);
        return turkeyDateTimeStr;

    };
   
    useEffect(() => {
        if (ticketdetail) {
          
            setValues({
                name: ticketdetail.ticket_detail.name || "",
                surname: ticketdetail.ticket_detail.surname || "",
                age: ticketdetail.ticket_detail.age || "",
                tc: ticketdetail.ticket_detail.tc || "",
                subject: ticketdetail.ticket_detail.subject || "",
                ticket_code: ticketdetail.ticket_detail.ticket_code || "",
                complaint_reason: ticketdetail.ticket_detail.complaint_reason || "",
                address: ticketdetail.ticket_detail.address || "",
                status: ticketdetail.ticket_detail.status || "",
                createdate: DateConverter(ticketdetail.ticket_detail.create_date) || "",
            });
            console.log(ticketdetail);
     
        }
    }, [ticketdetail]);

    
           

    return (
        <>
            <div className="container my-5 py-3 adminticketdetailcont">
                <h1 className="text-center">{ticketdetail && `Başvuru NO: ${ticketdetail.ticket_detail.id}`}</h1>
                <div className="row">

                    <AdminTicketDetailForm 
                        handleSubmit={handleSubmit}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        errors={errors}
                        touched={touched}
                        values={values}/>   
               
                </div>
 

  
            </div>  

            <div className="container p-5 mb-5 adminticketdetailcont">

                <form onSubmit={responseHandleSubmit}>

                    <div>
                        <textarea name="response" id="response" onChange={(e) => setResponseData({...responsedata,response : e.target.value})} className="form-control" rows={5} placeholder="Lütfen bir cevap yazınız."/>   
                    </div>      
                    <div className="my-3 d-flex justify-content-center">
                        <button className="btn btn-primary px-3" type="submit">Gönder</button>
                    </div>

                </form>  

            </div>   
            <div className="container adminticketdetailcont text-center">      
                <h1 className="my-5">Cevap Geçmişi</h1>  
                {ticketdetail && ticketdetail.ticket_responses.map((item, index) => (
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
        </>    
    );




};

export default AdminTicketDetail;