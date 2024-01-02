import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import CreateForm from "./CreateForm";

const CreateTicket = () => {
    
    const {setTicketCode} = useUser();
    
    const navigate = useNavigate();

    const postFormDataToAPI = async (formDataToSend) => {
        try {
        
            const response = await axios.post("http://127.0.0.1:8000/ticket/user/create-request", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            console.log("Veri başarıyla gönderildi.");
            console.log(response.data);

            setTicketCode(response.data);
            console.log();
            navigate("/basvuru-basarili");
        // Başarılı işlemler burada işlenir.
        } catch (error) {
            console.error("Bir hata oluştu:", error);
        // Hata durumları burada işlenir.
        }
    };
    
    const handleSubmitCreate = (value) => {
    
        const nowDateTime = new Date();   
        const year = nowDateTime.getFullYear();
        const month = String(nowDateTime.getMonth() + 1).padStart(2, "0");
        const day = String(nowDateTime.getDate()).padStart(2, "0");
        const hour = String(nowDateTime.getHours()).padStart(2, "0");
        const minute = String(nowDateTime.getMinutes()).padStart(2, "0");
        const second = String(nowDateTime.getSeconds()).padStart(2, "0");
        const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        value.create_date = formattedDateTime;

        const formDataToSend = new FormData();
        Object.entries(value).forEach(([key, value]) => {
            if (key === "files") {
                for (let i = 0; i < value.length; i++) {
                    formDataToSend.append("files", value[i]);
                }
            } else {
                formDataToSend.append(key, value);
            }
        });

     
     
        // Form verilerini API'ye gönderme fonksiyonunu burada çağırın.
        postFormDataToAPI(formDataToSend);
    };


    return (
       
        <CreateForm
            handleSubmitCreate={handleSubmitCreate}
        />
            
    
    );
};

export default CreateTicket;
