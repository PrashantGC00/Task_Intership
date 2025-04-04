import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { ItemsTrackingPopupSchema } from "../../Schemas/ItemsTrackingSchema";
import { LoadingContext } from "../../Context/LoadingContextProvider";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

const ItemsPopup = ({ open, handleClose, employees, items, itemEmployee }) => {
  const [datesInMonth, setDatesInMonth] = useState([]);
  const { loading, toggleLoading } = useContext(LoadingContext);

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= dayjs().daysInMonth(); i++) {
      dates.push(dayjs().date(i).format("YYYY-MM-DD"));
    }
    setDatesInMonth(dates);
  }, []);

  const handleSubmit = async (values, actions) => {
    toggleLoading();
    try {
      const updatedItem = {
        EmployeeId: values.EmployeeId,
        Date: values.Date,
        ItemId: values.ItemId,
        Quantity: values.quantity,
      };

      const response = await fetch(
        `http://localhost:5000/api/ItemsTracking/update-items-employee/${itemEmployee.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        console.log("Error updating item assignment");
        toast.error(result.message || "Error updating item assignment");
        return;
      }

      toast.success(result.message  || "Item List Updated Successfully");
      actions.resetForm();
      handleClose();
    } catch (err) {
      toast.error("Error Connecting to The Server");
      console.log("Request failed:", err);
    } finally {
      toggleLoading();
    }
  };

  const formik = useFormik({
    initialValues: {
      EmployeeId: itemEmployee?.employee_Id || "",
      Date: itemEmployee?.date || "",
      ItemId: itemEmployee?.item_Id || "",
      quantity: itemEmployee?.quantity || 1,
    },
    enableReinitialize: true,
    validationSchema: ItemsTrackingPopupSchema,
    onSubmit: handleSubmit,
  });;


  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <div className="w-[400px] bg-white p-6 rounded-lg">
        <Toaster />
        <h2 className="text-2xl font-bold mb-4 text-center">
          Edit Item Tracking
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div>
            <FormControl
              fullWidth
              error={Boolean(
                formik.errors.EmployeeId && formik.touched.EmployeeId
              )}
            >
              <InputLabel>Employees</InputLabel>
              <Select
                label="Employees"
                name="EmployeeId"
                error={formik.errors.EmployeeId}
                helperText={formik.errors.EmployeeId}
                value={formik.values.EmployeeId}
                onChange={formik.handleChange}
              >
                {employees.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.errors.EmployeeId && formik.touched.EmployeeId ? (
              <p className="text-red-500 text-sm">{formik.errors.EmployeeId}</p>
            ) : null}
          </div>

          <FormControl
            fullWidth
            error={Boolean(formik.errors.Date && formik.touched.Date)}
          >
            <InputLabel>Date</InputLabel>
            <Select
              label="Date"
              name="Date"
              error={formik.errors.Date}
              helperText={formik.errors.Date}
              value={formik.values.Date}
              onChange={formik.handleChange}
            >
              {datesInMonth.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(formik.errors.ItemId && formik.touched.ItemId)}
          >
            <InputLabel>Item</InputLabel>
            <Select
              label="Item"
              name="ItemId"
              error={formik.errors.ItemId}
              value={formik.values.ItemId}
              onChange={formik.handleChange}
              helperText={formik.errors.ItemId}
            >
              {items.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.itemname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="w-[100%]">
            <TextField
              label="Quantity"
              error={Boolean(formik.errors.quantity)}
              type="number"
              name="quantity"
              fullWidth
              value={formik.values.quantity}
              onChange={formik.handleChange}
              helperText={formik.errors.quantity}
            />
          </div>

          <div className="flex gap-3 mt-4 w-full">
            <Button variant="outlined" onClick={handleClose} fullWidth>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ItemsPopup;
