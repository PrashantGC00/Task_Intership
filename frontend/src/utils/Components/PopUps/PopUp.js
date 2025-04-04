import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
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
import { EmployeeSchema } from "../../Schemas/EmployeeSchema";
import toast, { Toaster } from "react-hot-toast";
import { LoadingContext } from "../../Context/LoadingContextProvider";

export const Popup = ({ open, handleClose, employee }) => {
  const [isChanged, setIsChanged] = useState(false);

  const { loading, toggleLoading } = useContext(LoadingContext);

  const handleSubmit = async (values, actions) => {
    try {
      toggleLoading();
      const response = await fetch(
        `http://localhost:5000/api/employee/update-employee/${employee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to update employee");
      } else {
        toast.success(result.message || "Employee updated successfully");
        handleClose();
      }
    } catch (error) {
      toast.error("An error occurred while updating the employee");
      console.error("Error updating employee:", error);
    } finally {
      toggleLoading();
    }
  };

  const formik = useFormik({
    initialValues: {
      Name: employee?.name || "",
      Email: employee?.email || "",
      Contact: employee?.contact || "",
      Status: employee?.status || "",
    },
    enableReinitialize: true,
    validationSchema: EmployeeSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const hasChanged =
      formik.values.Name !== formik.initialValues.Name ||
      formik.values.Email !== formik.initialValues.Email ||
      formik.values.Contact !== formik.initialValues.Contact ||
      formik.values.Status !== formik.initialValues.Status;

    setIsChanged(hasChanged);
  }, [formik.values, formik.initialValues]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-4 rounded-lg flex flex-col gap-9 w-[400px] h-auto"
      >
        <Toaster />
        <h2 className="text-xl font-bold text-center">Edit Employee</h2>

        <div>
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
            <p className="text-red-600">{formik.errors.Name}</p>
          )}
        </div>

        <div>
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

        <div>
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

        <div>
          <FormControl
            fullWidth
            error={Boolean(formik.errors.Status && formik.touched.Status)}
          >
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

        <div className="flex gap-4">
          <Button
            disabled={formik.isSubmitting || !isChanged}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
};
