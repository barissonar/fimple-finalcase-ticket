import React from "react";
import { useAdmin } from "../Context/AdminContext";
import axios from "axios";


const Header = () => {
    
    const {admininfo,setAdminInfo} = useAdmin();

    


    const adminLogout = async () => {
       
        try {
         
            const response = await axios.post("http://127.0.0.1:8000/ticket/admin/logout");
    
          
            console.log(response.data);
            setAdminInfo("");
    
        } catch (error) {
            
            console.error("Çıkış yapılamadı.", error);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary " data-bs-theme="dark">
                <div className="container-fluid">
        
                    <a className="navbar-brand" href="/">TicketSystem </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Anasayfa</a>
                            
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/basvuru-olustur">Başvuru Oluştur</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/basvuru-sorgula">Başvuru Sorgula</a>
                            </li>
                        </ul>
                        {admininfo.username && 
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {admininfo.username}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="/admin/basvuru-listesi/history">Başvuru Geçmişi</a></li>
                                    <li onClick={adminLogout}><a  className="dropdown-item" href="#">Çıkış Yap</a></li>
                                </ul>
                            </li>
                        </ul>
                        }
                    </div>
                </div>
            </nav>


        </>   
    );




};

export default Header;