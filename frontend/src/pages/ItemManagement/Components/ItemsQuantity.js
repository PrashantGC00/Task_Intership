import { Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const ItemsQuantity = () => {
  return (
    <div className="w-full h-auto flex justify-between">
      <FormControl className="h-[60px] w-[250px]">
        <InputLabel>Items</InputLabel>
        <Select label="Items"></Select>
      </FormControl>

        <TextField sx={{width:"250px"}} type="number" />

      <Button
        sx={{
          borderRadius: "50%",
          backgroundColor: "#DDEDC9",
          height: "60px",
          width: "auto",
          ":hover": {
            transform: "scale(0.9)",
          },
        }}
      >
        <AddIcon className="text-green-600" />
      </Button>
    </div>
  );
};

export default ItemsQuantity;
