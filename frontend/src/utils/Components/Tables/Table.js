import React, { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";

import { Popup } from '../PopUps/PopUp'
import { LoadingContext } from "../../Context/LoadingContextProvider";

const Table = ({ employees }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);

  console.log("Employees:", employees);

  const { toggleLoading } = useContext(LoadingContext)

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">No Employees Found</div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      toggleLoading()
      const response = await fetch(
        `http://localhost:5000/api/employee/delete-employee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to delete employee");
      } else {
        toast.success(result.message || "Employee deleted successfully");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the employee");
      console.error(err);
    }finally{
      toggleLoading()
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-4 h-full">
      <Toaster />
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-sm flex flex-col">
        <h1 className="text-2xl font-bold p-4 w-full text-center">
          Employee List
        </h1>

        <div className="grid grid-cols-5 gap-4 p-4 border-b font-bold">
          <div className=""></div>
          <div className="">Name</div>
          <div className="">Email</div>
          <div className="">Contact</div>
          <div className="text-center">Status</div>
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 200px)" }}
        >
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="grid gap-4 p-4 border-b"
            >
              <div className="flex gap-5">
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-100 rounded-md px-2 py-1 text-red-800 hover:scale-110"
                >
                  <DeleteOutlineIcon />
                </button>
                <button
                  className="bg-blue-100 rounded-md px-2 py-1 text-blue-800 hover:scale-110"
                  onClick={() => handleOpen(employee)}
                >
                  <EditIcon />
                </button>
              </div>
              <div className="col-span-3">{employee.name}</div>
              <div className="col-span-3 truncate">{employee.email}</div>
              <div className="col-span-2">{employee.contact}</div>
              <div className="col-span-2 text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEmployee && (
        <Popup open={open} handleClose={handleClose} employee={selectedEmployee} />
      )}
    </div>
  );
};

export default Table


