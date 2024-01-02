import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const AdminLogin = () => {
    
   
    const navigate = useNavigate();
    
    const InitialFormValue = {
        username: "",
        password: "",
    };

    const [formData, setFormData] = useState(InitialFormValue);
    

    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
            
        });
        console.log(formData);
    };

    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = "csrftoken";
    
    
    const postAdminLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/ticket/admin/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            toast.success("Giriş Başarılı");
            
            setTimeout(() => {
                navigate("/admin/basvuru-listesi");
            }, 2000);
            
        
            // İstek başarılıysa buraya gelir
            console.log(response.data);
        } catch (error) {
            // Hata durumunda buraya gelir
            if(error.response.status === 401) {
             
                toast.error("kullanıcı adı veya şifre yanlış.");

            }
            else {
                toast.error("bir hata oluştu lütfen daha sonra tekrar deneyin.");
            }
        }

    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        postAdminLogin();
    };

   

    return (
        <div className="container my-5">

            <div className="row">

                <div className="col-12 d-flex justify-content-center my-5">
             
                    <form className="adminlogin boxmodel py-5 px-5" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column gap-4 text-center">
                            <h2>Admin Login</h2>
                            <input className="form-control" onChange={handleChange} name="username" placeholder="Kullanıcı adı"/>
                            <input type="password" className="form-control"  onChange={handleChange} name="password"  placeholder="Şifre"/>
                            <input value="Giriş Yap" className="btn btn-primary" type="submit"/>
                        </div>
                    </form>  
             
                </div>

            </div>
          

        </div>   
    );




};

export default AdminLogin;