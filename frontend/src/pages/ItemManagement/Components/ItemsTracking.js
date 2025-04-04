import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { ItemsTrackingSchema } from "../../../utils/Schemas/ItemsTrackingSchema";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingContext } from "../../../utils/Context/LoadingContextProvider";

const ItemsTracking = ({ employees, items, itemsEmployee }) => {
  const [datesInMonth, setDatesInMonth] = useState([]);

  const { loading, toggleLoading } = useContext(LoadingContext)

  useEffect(() => {
    const dates = [];
    for (let i = 1; i <= dayjs().daysInMonth(); i++) {
      dates.push(dayjs().date(i).format("YYYY-MM-DD"));
    }
    setDatesInMonth(dates);
  }, []);

  const handleSubmit = async (values, actions) => {
    toggleLoading()
    try {
      const itemTrackingList = values.Items.map((item) => ({
        EmployeeId: values.EmployeeId,
        Date: values.Date,
        ItemId: item.ItemId,
        Quantity: item.quantity,
      }));

      const response = await fetch(
        "http://localhost:5000/api/ItemsTracking/insert-items-employee",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` },
          body: JSON.stringify(itemTrackingList),
        }
      );

      if (!response.ok) {
        console.log("error");
        return;
      }

      const result = await response.json();
      console.log(result.message);
      actions.resetForm();
    } catch (err) {
      console.log("Request failed:", err);
    }finally{
      toggleLoading()
    }
  };

  const formik = useFormik({
    initialValues: {
      EmployeeId: "",
      Date: "",
      Items: [{ ItemId: "", quantity: 1 }],
    },
    validationSchema: ItemsTrackingSchema,
    onSubmit: handleSubmit,
  });

  const addItem = () => {
    formik.setFieldValue("Items", [
      ...formik.values.Items,
      { ItemId: "", quantity: 1 },
    ]);
  };

  const removeItem = (index) => {
    const updatedItems = formik.values.Items.filter((item, i) => i !== index);
    formik.setFieldValue("Items", updatedItems);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit();
      }}
      className="w-[40%] h-[100vh] gap-7 pt-[10vh] pb-7 flex items-center flex-col bg-primary-color"
    >
      <div className="w-[100%] h-[60px] text-5xl font-bold flex self-start justify-evenly">
        Item Management
      </div>

      <div className="w-[85%] h-[70px] flex gap-[60px] self-center">
        <div className="h-[100%] w-[auto] flex flex-col">
          <FormControl
            className="h-[60px] w-[250px]"
            error={Boolean(
              formik.errors.EmployeeId && formik.touched.EmployeeId
            )}
          >
            <InputLabel>Employees</InputLabel>
            <Select
              label="Employees"
              name="EmployeeId"
              value={formik.values.EmployeeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {employees?.map((e) => (
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

        <div className="h-[100%] w-[auto] flex flex-col">
          <FormControl
            className="h-[60px] w-[250px]"
            error={Boolean(
              formik.errors.Date && formik.touched.Date
            )}
          >
            <InputLabel>Date</InputLabel>
            <Select
              label="Date"
              name="Date"
              value={formik.values.Date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {datesInMonth.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.errors.Date && formik.touched.Date ? (
            <p className="text-red-500 text-sm">{formik.errors.Date}</p>
          ) : null}
        </div>
      </div>

      <div className="w-[100%] max-h-[calc(80vh-200px)] py-5 flex justify-evenly flex-col overflow-y-auto items-center gap-9">
        {formik.values.Items.map((item, index) => (
          <div key={index} className="w-[100%] h-[65px] flex justify-evenly ">
            <div className="h-[100%] w-[auto] flex flex-col">
              <FormControl
                className="w-[250px] h-[auto] "
                error={
                  formik.errors.Items?.[index]?.ItemId &&
                  formik.touched.Items?.[index]?.ItemId
                }
              >
                <InputLabel>Items</InputLabel>
                <Select
                  label="Items"
                  name={`Items[${index}].ItemId`}
                  value={item.ItemId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {items.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.itemname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.errors.Items?.[index]?.ItemId &&
              formik.touched.Items?.[index]?.ItemId ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.Items[index].ItemId}
                </p>
              ) : null}
            </div>
            <div className="h-[100%] w-[auto] flex flex-col">
              <TextField
                error={
                  formik.errors.Items?.[index]?.quantity &&
                  formik.touched.Items?.[index]?.quantity
                }
                label="Quantity"
                sx={{ width: "250px" }}
                type="number"
                name={`Items[${index}].quantity`}
                value={item.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.Items?.[index]?.quantity &&
              formik.touched.Items?.[index]?.quantity ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.Items[index].quantity}
                </p>
              ) : null}
            </div>
            <div className="h-[90%] w-[auto] flex">
              <button
                className="bg-red-200 rounded-md px-2 py-1 text-red-800 hover:scale-110 self-center"
                onClick={() => removeItem(index)}
                type="button"
              >
                <RemoveIcon className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[100%] h-[55px] flex justify-evenly mt-auto bottom-0">
        <Button
          sx={{
            width: "250px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
          variant="outlined"
          type="button"
          onClick={addItem}
        >
          Add Item <AddIcon />
        </Button>

        <Button sx={{ width: "250px" }} variant="contained" type="submit">
          { loading ? (<CircularProgress />) : "Insert"}
        </Button>
      </div>
    </form>
  );
};

export default ItemsTracking;
