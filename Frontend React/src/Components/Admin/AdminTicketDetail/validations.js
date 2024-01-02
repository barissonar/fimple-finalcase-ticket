import * as yup from "yup";



const validationsTicketDetail = yup.object().shape({
    name: yup.string().required("Ad zorunludur.").max(50, "Ad en fazla 50 karakter olmalıdır."),
    surname: yup.string().required("Soyad zorunludur.").max(50, "Soyad en fazla 50 karakter olmalıdır."),
    age: yup.number().required("Yaş zorunludur.").positive("Yaş pozitif bir değer olmalıdır.").integer("Yaş tam sayı olmalıdır."),
    tc: yup.string().required("TC kimlik numarası zorunludur.").min(11, "TC kimlik numarası en az 11 karakter olmalıdır.").max(11, "TC kimlik numarası en fazla 11 karakter olmalıdır."),
    subject: yup.string().required("Başvuru Konusu zorunludur.").max(100, "Başvuru Konusu en fazla 100 karakter olmalıdır."),
    complaint_reason: yup.string().required("Başvuru Nedeni zorunludur.").max(500, "Başvuru Nedeni en fazla 500 karakter olmalıdır."),
    address: yup.string().required("Adres zorunludur.").max(150, "Adres en fazla 150 karakter olmalıdır."),
    ticket_code: yup.string().required("Ticket kodu zorunludur.").min(10, "En az 10 karakter olmalıdır.").max(10, "En fazla 10 karakter olmalıdır."),
});




export default validationsTicketDetail;