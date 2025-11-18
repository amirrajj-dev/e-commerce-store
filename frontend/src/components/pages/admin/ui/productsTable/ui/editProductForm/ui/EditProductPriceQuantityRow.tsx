import React from "react";
import EditProductPriceField from "./EditProductPriceField";
import EditProductQuantityField from "./EditProductQuantityField";
import type{ EditFormFieldProps } from "../types/types";

const EditProductPriceQuantityRow: React.FC<EditFormFieldProps> = (props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <EditProductPriceField {...props} />
      <EditProductQuantityField {...props} />
    </div>
  );
};

export default EditProductPriceQuantityRow;