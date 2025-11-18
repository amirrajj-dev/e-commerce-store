import React from "react";
import type{ EditActionsProps } from "../types/types";

const EditProductActions: React.FC<EditActionsProps> = ({
  isUpdating,
  onCancel,
}) => {
  return (
    <div className="flex gap-3 justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={isUpdating}
        className="btn btn-ghost"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isUpdating}
        className="btn btn-success disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdating ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Updating...
          </>
        ) : (
          "Update Product"
        )}
      </button>
    </div>
  );
};

export default EditProductActions;