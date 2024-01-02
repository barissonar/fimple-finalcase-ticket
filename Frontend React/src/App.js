import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CreateTicket from "./Components/CreateTicket";
import CreateSuccess from "./Components/CreateTicket/CreateSuccess";
import QueryTicket from "./Components/QueryTicket";
import QueryDetail from "./Components/QueryTicket/QueryDetail";
import AdminLogin from "./Components/Admin/AdminLogin";
import Header from "./Components/Header";
import NotFound from "./Components/NotFound";
import UnansweredList from "./Components/Admin/AdminTicketList/UnansweredList";
import AnsweredList from "./Components/Admin/AdminTicketList/AnsweredList";
import AdminTicketDetail from "./Components/Admin/AdminTicketDetail";
import axios from "axios";
import { useAdmin } from "./Context/AdminContext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { UserProvider } from "./Context/UserContext";
import React from "react";


function App() {

    const {setAdminInfo} = useAdmin();
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = "csrftoken";

    


    const getAdmin = async () => {
        try {
            // GET isteği
            const response = await axios.get("http://127.0.0.1:8000/ticket/admin/authanticate", {
                withCredentials: true,
            });
            
            // İstek başarılıysa response.data içinde veriler bulunur
            console.log(response.data);
            setAdminInfo(response.data);
            
          
            
            
        } catch (error) {
            // Hata durumunda buraya gelir
            console.error("Bir hata oluştu:", error);
        }
    };

    useEffect(() => {

        getAdmin();
        

    },[]);
    




    const router = createBrowserRouter([
    
        {
            path: "/", 
            element: <p>HomePage</p>,
        },

        {
            path: "/basvuru-olustur", 
            element: <CreateTicket/>,
        },

        {
            path: "/basvuru-basarili", 
            element: <CreateSuccess/>,
        },

        {
            path: "/basvuru-sorgula", 
            element: <QueryTicket/>,
        },

        {
            path: "/basvuru/:ticketcode", 
            element: <QueryDetail/>,
        },

        {
            path: "/admin", 
            element: <AdminLogin/>,
        },

        {
            path: "/admin/basvuru-listesi", 
            element: <UnansweredList/>,
        },

        {
            path: "/admin/basvuru-listesi/history", 
            element: <AnsweredList/>,
        },

        {
            path: "/admin/basvuru/:ticketid", 
            element: <AdminTicketDetail/>,
        },

        {
            path: "/not-found", 
            element: <NotFound/>,
        },

    ]);

    return (

        <>  
            <ToastContainer/>
            <UserProvider>
                <Header/>
                <RouterProvider router={router}>
                </RouterProvider>
            </UserProvider>
        </>
   
    
    );
}

export default App;
