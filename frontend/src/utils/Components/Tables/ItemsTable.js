import React, { useState, useContext, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";
import { LoadingContext } from "../../Context/LoadingContextProvider";
import ItemsPopup from "../PopUps/ItemsPopup";

const Table = ({ employees, items, itemsEmployee }) => {
  const [open, setOpen] = useState(false);
  const [selectedItemEmployee, setSelectedItemEmployee] = useState(null);

  const { toggleLoading } = useContext(LoadingContext);

  const handleOpen = (itemEmployee) => {
    setSelectedItemEmployee(itemEmployee);
    console.log(selectedItemEmployee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!itemsEmployee || itemsEmployee.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-bold">No Items Assigned to Employees</div>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      toggleLoading();
      const response = await fetch(
        `http://localhost:5000/api/ItemsTracking/delete-items-employee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to delete item assignment");
      } else {
        toast.success(result.message || "Item assignment deleted successfully");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the item assignment");
      console.error("Error deleting item assignment:", error);
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className="flex justify-center items-start p-4 h-full">
      <Toaster />
      <div className="w-full flex flex-col">
        <h1 className="text-2xl font-bold p-4 w-full text-center">
          Items Tracking List
        </h1>

        <div className="grid grid-cols-5 gap-4 p-4 border-b font-bold">
          <div className=""></div>
          <div className="">Employee Name</div>
          <div className="">Item Name</div>
          <div className="">Quantity</div>
          <div className="text-center">Date Assigned</div>
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 200px)" }}
        >
          {itemsEmployee.map((itemEmployee) => {
            const employee = employees.find(
              (emp) => emp.id === itemEmployee.employee_Id
            );
            const item = items.find((it) => it.id === itemEmployee.item_Id);
            return (
              <div
                key={itemEmployee.id}
                className="grid grid-cols-5 gap-4 p-4 border-b"
              >
                <div className="col-span-1 flex gap-5">
                  <button
                    onClick={() => handleDelete(itemEmployee.id)}
                    className="bg-red-100 rounded-md px-2 p-1 text-red-800 hover:scale-110"
                  >
                    <DeleteOutlineIcon />
                  </button>
                  <button
                    className="bg-blue-100 rounded-md px-2 py-1 text-blue-800 hover:scale-110"
                    onClick={() => handleOpen(itemEmployee)}
                  >
                    <EditIcon />
                  </button>
                </div>
                <div className="">{employee.name}</div>
                <div className="">{item.itemname}</div>
                <div className="">{itemEmployee.quantity}</div>
                <div className="text-center">{itemEmployee.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      {open && selectedItemEmployee && (
        <ItemsPopup
          open={open}
          handleClose={handleClose}
          employees={employees}
          items={items}
          itemEmployee={selectedItemEmployee}
        />
      )}
    </div>
  );
};

export default Table;
