import { createContext, useState, useContext } from "react";
import React from "react";
import PropTypes from "prop-types";

const AdminContext = createContext();

export const AdminProvider = ({children}) => {

    const [admininfo, setAdminInfo] = useState({});
  

    const values = {
        admininfo,
        setAdminInfo,
      
    };
    
    return (
        <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    );

};

AdminProvider.propTypes = {
    children: PropTypes.node
};

export const useAdmin = () => useContext(AdminContext);

