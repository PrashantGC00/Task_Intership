import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ItemsQuantity from "./ItemsQuantity";

const ItemsTracking = (props) => {
  const { employees } = props;

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [datesInMonth, setDatesInMonth] = useState([]);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const generateDates = () => {
    const currentMonth = dayjs();
    const daysInMonth = currentMonth.daysInMonth();
    const dates = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = currentMonth.date(i).format('YYYY-MM-DD');
      dates.push(fullDate);
    }

    return dates;
  };

  useEffect(() => {
    const dates = generateDates();
    setDatesInMonth(dates);
  }, []);

  const handleSubmit = () => {
    console.log("Selected Employee:", selectedEmployee);
    console.log("Selected Date:", selectedDate);
  };

  console.log(datesInMonth)

  return (
    <div className="w-[70%] h-[100%] bg-primary-color flex items-center flex-col gap-10">
      <div className="w-[50%] h-auto flex justify-between">
        <FormControl className="h-[60px] w-[250px]">
          <InputLabel>Employees</InputLabel>
          <Select
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            label="Employees"
          >
            {employees && employees.map((e) => (
              <MenuItem key={e.id} value={e.id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="h-[60px] w-[250px] self-start">
          <InputLabel>Date</InputLabel>
          <Select
            value={selectedDate}
            onChange={handleDateChange}
            label="Date"
          >
            {datesInMonth.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button onClick={handleSubmit}>Submit</Button>
      </div>

      <div className="w-[50%] h-auto flex justify-between items-center bg-aqua-500">
        <ItemsQuantity />
      </div>
    </div>
  );
};

export default ItemsTracking;
