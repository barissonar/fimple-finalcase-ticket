import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import validations from "./validations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateForm = ({handleSubmitCreate}) => {

    const {handleSubmit,handleChange,setFieldValue,handleBlur,errors,touched} = useFormik({
        
        initialValues: {
            name: "",    
            surname: "",
            age: "",
            tc: "",
            subject: "",
            complaint_reason: "",
            address: "",
            create_date:"",
            files : []
        },
        onSubmit: (values) => {
            console.log(values,"değerler geldi");
            handleSubmitCreate(values);
      
        },     
        validationSchema : validations,
    });


    return(
        <div className="container my-5">
            <div className="row  d-flex justify-content-center">
                <div className="col-6">
                    <Form className="p-2 boxmodel" onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-around">

                            <Form.Group className="mb-3  col-5" controlId="nameInput">
                                <Form.Label>Ad</Form.Label>
                                <Form.Control name="name" onChange={handleChange} onBlur={handleBlur}/>
                                <Form.Text>{errors.name && touched.name ? errors.name : ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 mr-3  col-5" controlId="surnameInput">
                                <Form.Label >Soyad</Form.Label>
                                <Form.Control name="surname" onChange={handleChange} onBlur={handleBlur}/>
                                <Form.Text>{errors.surname && touched.surname ? errors.surname : ""}</Form.Text>
                            </Form.Group>

                        </div> 

                        <div className="d-flex justify-content-around">

                            <Form.Group className="mb-3 col-5" controlId="ageInput">
                                <Form.Label>Yaş</Form.Label>
                                <Form.Control type="number" name="age" onChange={handleChange} onBlur={handleBlur}/>
                                <Form.Text>{errors.age && touched.age ? errors.age : ""}</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3 col-5" controlId="tcInput">
                                <Form.Label>Tc Kimlik No</Form.Label>
                                <Form.Control type="number" name="tc" onChange={handleChange} onBlur={handleBlur}/>
                                <Form.Text>{errors.tc && touched.tc ? errors.tc : ""}</Form.Text>
                            </Form.Group>

                        </div> 
                  
                 
                        <Form.Group className="mb-3 " controlId="subjectInput">
                            <Form.Label>Başvuru Konusu</Form.Label>
                            <Form.Control name="subject" onChange={handleChange} onBlur={handleBlur}/>
                            <Form.Text>{errors.subject && touched.subject ? errors.subject : ""}</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="complaintReason">
                            <Form.Label>Başvurma Nedeni</Form.Label>
                            <Form.Control as="textarea" rows={3} name="complaint_reason" onChange={handleChange} onBlur={handleBlur}/>
                            <Form.Text>{errors.complaint_reason && touched.complaint_reason ? errors.complaint_reason : ""}</Form.Text>
                        </Form.Group>
                  

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Adres</Form.Label>
                            <Form.Control as="textarea" rows={3} name="address" onChange={handleChange} onBlur={handleBlur}/>
                            <Form.Text>{errors.address && touched.address ? errors.address : ""}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Fotoğraflar / Ekler</Form.Label>
                            <Form.Control type="file" name="files" multiple onChange={(e) => setFieldValue("files", e.target.files)} />
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" className="px-4">
                         Gönder
                            </Button>
                        </div>  

                    </Form>
                </div>  

              
                
            </div>

            
        </div> 




    );
};

CreateForm.propTypes = {
    handleSubmitCreate: PropTypes.func.isRequired,
};

export default CreateForm;
