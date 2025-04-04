import * as yup from "yup";

export const ItemsTrackingSchema = yup.object().shape({
  EmployeeId: yup.string().required("Employee is required"),
  Date: yup.string().required("Date is required"),
  Items: yup
    .array()
    .of(
      yup.object().shape({
        ItemId: yup.string().required("Item is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1")
          .integer("Quantity must be an integer"),
      })
    )
    .min(1, "At least one item is required")
});


export const ItemsTrackingPopupSchema = yup.object().shape({
  EmployeeId: yup.string().required("Employee is required"),
  Date: yup.string().required("Date is required"),
  ItemId: yup.string().required("Item is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .integer("Quantity must be an integer")
});

