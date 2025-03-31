
import "./App.css";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { EmployeeSchema } from "./utils/Schemas/EmployeeSchema";
import './Mui.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Employee from "./pages/Employee/Employee";

import NavigationBar from "./utils/Components/NavigationBar";
import ItemManageent from "./pages/ItemManagement/ItemManageent";

const handleSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

function App() {


  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/items" element={<ItemManageent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
