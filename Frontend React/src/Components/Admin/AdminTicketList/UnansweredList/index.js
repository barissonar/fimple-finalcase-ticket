import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UnansweredList = () => {
   
   
    const [activetickets,setActiveTickets] = useState();

  

    const getActiveTickets = async () => {

        try {
            // GET isteği gönder ve yanıtı bekleyerek al
            const response = await axios.get("http://127.0.0.1:8000/ticket/admin/ticket-list/activeticket");
      
            console.log("API yanıtı:", response.data);

            setActiveTickets(response.data);
          

        } catch (error) {
            // Hata durumunda burada işlemler yapabilirsiniz
            if(error.response.status === 404) {
             
                console.log("active ticket bulunamadı.");

            }

            else {
            
                console.log("bir hata oluştu. lütfen daha sonra tekrar deneyin.");
            }

        }
    };

    useEffect(() => {

        getActiveTickets();

    },[]);

    const dateFormat = (date) => {

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
        <div>
           
            
            {activetickets && (    
                <div className="tableContainer container my-2">

                   
                    <table className="table">
                        <thead>
                       

                       
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Konu</th>
                                <th scope="col">Ad</th>
                                <th scope="col">Soyad</th>
                                <th scope="col">Başvuru Tarihi</th>
                                <th scope="col">Başvuru Durumu</th>
                                <th scope="col">#</th>
                            
                            </tr>
                    
                        </thead>
                        <tbody>
                            {activetickets.map((item,index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{item.ticket_detail.subject}</td>
                                        <td>{item.ticket_detail.name}</td>
                                        <td>{item.ticket_detail.surname}</td>
                                        <td>{dateFormat(item.ticket_detail.create_date)}</td>
                                        <td>{item.ticket_detail.status === 3 &&
                                     <div>
                                         <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24
                                       s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                                         <span className="ms-1">Bekliyor / Cevaplanmadı</span>
                                     </div>
                                    
                                        } 
                                        {item.ticket_detail.status === 2 &&
                                     <div>
                                         <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>

                                         <span className="ms-1">İptal Edildi</span>
                                     </div>
                                    
                                        } 
                                        {item.ticket_detail.status === 1 &&
                                     <div>
                                         <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                                         <span className="ms-1">Çözüldü</span>
                                     </div>
                                    
                                        } 
                                        </td>
                                        <td>
                                            <Link to={`/admin/basvuru/${item.ticket_detail.id}`}>
                                                <button type="button" className="btn btn-primary detailbutton">Görüntüle</button>
                                            </Link>  
                                        </td>
                                    </tr>
                                );
                            })}  

                    
                     
    
                       
                        </tbody>
                    </table>
           
                </div>
            )};
        </div>   
       
        
    );




};

export default UnansweredList;