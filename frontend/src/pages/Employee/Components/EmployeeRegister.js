import React, { useContext } from "react";
import { useFormik } from "formik";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { EmployeeSchema } from "../../../utils/Schemas/EmployeeSchema";
import toast, { Toaster } from "react-hot-toast";
import { LoadingContext } from "../../../utils/Context/LoadingContextProvider";


const EmployeeRegister = () => {  

  const { toggleLoading } = useContext(LoadingContext)

  const handleSubmit = async (values, actions) => {
    try {
      toggleLoading()
      const response = await fetch("http://localhost:5000/api/employee/register-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values)
      });
  
      const result = await response.json();
  
      if (!response.ok) {  
        toast.error(result.message || "Failed to register employee");
        return;
      }
      toast.success(result.message || "Employee registered successfully");
      actions.resetForm();
    } catch (err) {
      toast.error("An error occurred while registering the employee");
    }finally{
      toggleLoading()
    }
  
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Contact: "",
      Status: "",
    },
    validationSchema: EmployeeSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-[30%] h-[100vh] flex justify-center items-center flex-col gap-7">
      <Toaster />
      <div className="text-5xl font-bold">Register User</div>
      <form onSubmit={formik.handleSubmit} className="w-[100%] h-[50%] flex flex-col justify-center items-center gap-9">
        <div className="h-[60px] w-[250px]">
          <TextField
            error={Boolean(formik.errors.Name && formik.touched.Name)}
            fullWidth
            value={formik.values.Name}
            name="Name"
            onChange={formik.handleChange}
            label="Name"
            onBlur={formik.handleBlur}
          />
          {formik.errors.Name && formik.touched.Name && (
            <p className="text-red-600 ">{formik.errors.Name}</p>
          )}
        </div>
        <div className="h-[60px] w-[250px]">
          <TextField
            error={Boolean(formik.errors.Email && formik.touched.Email)}
            fullWidth
            value={formik.values.Email}
            name="Email"
            onChange={formik.handleChange}
            label="Email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.Email && formik.touched.Email && (
            <p className="text-red-600">{formik.errors.Email}</p>
          )}
        </div>
        <div className="h-[60px] w-[250px]">
          <TextField
            error={Boolean(formik.errors.Contact && formik.touched.Contact)}
            fullWidth
            value={formik.values.Contact}
            name="Contact"
            onChange={formik.handleChange}
            label="Phone Number"
            onBlur={formik.handleBlur}
          />
          {formik.errors.Contact && formik.touched.Contact && (
            <p className="text-red-600">{formik.errors.Contact}</p>
          )}
        </div>
        <div className="h-[60px] w-[250px]">
          <FormControl fullWidth error={Boolean(formik.errors.Status && formik.touched.Status)}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={formik.values.Status}
              onBlur={formik.handleBlur}
              name="Status"
              onChange={formik.handleChange}
            >
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
            </Select>
          </FormControl>
          {formik.errors.Status && formik.touched.Status && (
            <p className="text-red-600">{formik.errors.Status}</p>
          )}
        </div>
        <div className="h-[60px] w-[250px]">
          <Button
            className="h-[55px]"
            disabled={formik.isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {formik.isSubmitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
