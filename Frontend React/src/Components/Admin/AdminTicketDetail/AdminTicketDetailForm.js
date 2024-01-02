import React from "react";
import PropTypes from "prop-types";

const AdminTicketDetailForm = ({handleSubmit, handleChange, handleBlur, errors, touched, values }) => {

    return (
        <>
            <form className="py-5 d-flex flex-column gap-3" onSubmit={handleSubmit} >

                <div className="d-flex justify-content-center gap-5">             

                    <div className="col-5">
                        <label className="mb-1" htmlFor="nameInput">Ad</label>  
                        <input name="name" value={values.name}  onChange={handleChange} onBlur={handleBlur} id="nameInput" className="form-control" />
                        {errors.name && touched.name ? errors.name : ""}
                    </div>             

                    <div className="col-5">
                        <label className="mb-1" htmlFor="surnameInput">Soyad</label>  
                        <input name="surname" value={values.surname} onChange={handleChange} onBlur={handleBlur} id="surnameInput" className="form-control" />
                        {errors.surname && touched.surname ? errors.surname : ""}
                    </div>             

                </div>             

                <div className="d-flex justify-content-center gap-5">             

                    <div className="col-5">
                        <label className="mb-1" htmlFor="ageInput">Yaş</label>  
                        <input name="age" id="ageInput" value={values.age} onChange={handleChange} onBlur={handleBlur} className="form-control" />
                        {errors.age && touched.age ? errors.age : ""}
                    </div>             

                    <div className="col-5">
                        <label className="mb-1" htmlFor="tcInput">Tc</label>  
                        <input name="tc" id="tcInput" value={values.tc} onChange={handleChange} onBlur={handleBlur} className="form-control" type="number" />
                        {errors.tc && touched.tc ? errors.tc : ""}
                    </div>             

                </div>             

                <div className="d-flex justify-content-center gap-5">
                    <div className="col-5">
                        <label className="mb-1" htmlFor="subjectInput">Başvuru Konusu</label>   
                        <input name="subject" id="subjectInput" value={values.subject} onChange={handleChange} onBlur={handleBlur} className="form-control" />
                        {errors.subject && touched.subject ? errors.subject : ""}
                    </div>              

                    <div className="col-5">             

                        <label className="mb-1" htmlFor="ticketcodeInput">Ticket Kodu</label>  
                        <input name="ticket_code" id="ticketcodeInput" value={values.ticket_code} onChange={handleChange} onBlur={handleBlur} className="form-control" type="number"></input>
                        {errors.ticket_code && touched.ticket_code ? errors.ticket_code : ""}             

                    </div>             

                </div>               

                <div>             

                    <label className="mb-1" htmlFor="complaint_reasonInput">Başvuru Nedeni</label>  
                    <textarea rows={4} name="complaint_reason" id="complaint_reasonInput" value={values.complaint_reason} onChange={handleChange} onBlur={handleBlur} className="form-control">
             complaint_reason
                    </textarea>
                    {errors.complaint_reason && touched.complaint_reason ? errors.complaint_reason: ""}
                </div>             

                <div>
                    <label className="mb-1" htmlFor="addressInput">Adres</label>
                    <textarea name="address" rows={4}  id="addressInput" value={values.address} onChange={handleChange} onBlur={handleBlur} className="form-control">
             address
                    </textarea>
                    {errors.address && touched.address ? errors.address : ""}
                </div>             

                <div>
                    <label className="mb-1" htmlFor="statusInput">Başvuru Durumu</label>  
                    <select name= "status" id="statusInput" onChange={handleChange} value={values.status} onBlur={handleBlur} className="form-control">
                        <option value="1">Çözüldü</option>
                        <option value="2">iptal edildi</option>
                        <option value="3">Bekliyor</option>
                    </select>     
                </div>
                <div>
                    <label className="mb-1" htmlFor="dateInput">Başvuru Tarihi</label>  
                    <input className="form-control" disabled name="createdate" id="dateInput" value={values.createdate}/>
                </div>
                <div className="d-flex justify-content-center py-3">
                    <button className="btn btn-primary" type="submit">Güncelle</button>             

                </div>
            </form>
        
        </>
    );


};

AdminTicketDetailForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    touched : PropTypes.object.isRequired,
    values : PropTypes.object.isRequired,
};

export default AdminTicketDetailForm;