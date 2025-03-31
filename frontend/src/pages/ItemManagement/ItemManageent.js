import React, { useState, useEffect } from "react";
import ItemsTracking from "./Components/ItemsTracking";

const ItemManageent = () => {
  const [employees, setEmployees] = useState();

  useEffect(() => {
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
        setEmployees(result.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="w-[100%] h-[100vh] bg-primary-color flex pt-[10vh] justify-center items-center gap-10">
        <ItemsTracking employees={employees} />
    </div>
  )
};

export default ItemManageent;
