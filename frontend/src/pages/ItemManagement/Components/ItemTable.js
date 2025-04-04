import React from "react";
import ItemsTable from "../../../utils/Components/Tables/ItemsTable";

const ItemTable = ({items, employees, itemsEmployee}) => {

  return (
    <div className="w-[60%] h-[100%] flex justify-center pt-[10vh] bg-white right-0 fixed">
      <div className="w-[90%] h-[auto]">
        <ItemsTable items={items} employees={employees} itemsEmployee={itemsEmployee} />
      </div>
    </div>
  );
};

export default ItemTable;
