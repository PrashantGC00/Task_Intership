import React, { useState, useEffect, useContext } from 'react'

import EmployeeRegister from './Components/EmployeeRegister'
import EmployeeTable from './Components/EmployeeTable'
import { LoadingContext } from '../../utils/Context/LoadingContextProvider'

const Employee = () => {

  const [employees, setEmployees] = useState()
  const { loading } = useContext(LoadingContext)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employee/get-employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
  }, [loading]);

  return (
    <div className='w-[100%] h-[100vh] bg-primary-color flex'>
        <EmployeeRegister employees={employees} />
        <EmployeeTable employees={employees} />
    </div>  
  )
}

export default Employee