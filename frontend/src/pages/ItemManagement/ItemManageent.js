import React, { useState, useEffect, useContext } from "react";
import ItemsTracking from "./Components/ItemsTracking";
import ItemTable from "./Components/ItemTable";
import { LoadingContext } from "../../utils/Context/LoadingContextProvider";

const ItemManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsEmployee, setItemsEmployee] = useState([]);

  const { loading, toggleLoading } = useContext(LoadingContext)

  useEffect(() => {
    toggleLoading()
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employee/get-employees",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.log(result.message || "Failed to fetch employees");
        }

        setEmployees(result.data || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    const getItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/Items/get-items",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.log("Error fetching items");
          return;
        }

        const result = await response.json();
        setItems(result.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    const getItemsEmployee = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/ItemsTracking",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.log("Error");
          return;
        }

        const result = await response.json();
        setItemsEmployee(result.data);
      } catch (err) {
        console.error("Error fetching itemsEmployee:", err);
      }
    };
    fetchEmployees();
    getItems();
    getItemsEmployee();
    toggleLoading()
  }, [loading]);

  return (
    <div className="w-[100%] h-[100vh] flex flex-col gap-7">
      <ItemsTracking employees={employees} items={items} itemsEmployee={itemsEmployee} />
      <ItemTable
        items={items}
        employees={employees}
        itemsEmployee={itemsEmployee}
      />
    </div>
  );
};

export default ItemManagement;
