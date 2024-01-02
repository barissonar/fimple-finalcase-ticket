import { createContext, useState, useContext } from "react";
import React from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [ticketcode, setTicketCode] = useState("");
    const [ticketdetail, setTicketDetail] = useState({});

    const values = {
        ticketcode,
        setTicketCode,
        ticketdetail,
        setTicketDetail,
    };
    
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );

};

UserProvider.propTypes = {
    children: PropTypes.node
};

export const useUser = () => useContext(UserContext);

