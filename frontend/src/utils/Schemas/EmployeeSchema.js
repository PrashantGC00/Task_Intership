import * as yup from "yup";

export const EmployeeSchema = yup.object().shape({
  Name: yup.string().required("Required"),
  Email: yup.string().email("Please Enter valid Email").required("Required"),
  Contact: yup
    .string()
    .matches(/^[0-9]{10}$/, { message: "Not a Valid Phone Number" })
    .required("Required"),
    Status : yup.string("Please Select a Status").required("Required"),
});
