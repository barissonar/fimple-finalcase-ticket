
import { useUser } from "../../Context/UserContext";
import React from "react";

const CreateSuccess = () => {

    const {ticketcode} = useUser();


    return (
        <div className="container text-center p-5">
            <p className="successmessage my-5">Başvurunuz Başarıyla oluşturulmuştur. <br/> Kodunuz: {ticketcode} </p> 
        </div>   
    );




};

export default CreateSuccess;