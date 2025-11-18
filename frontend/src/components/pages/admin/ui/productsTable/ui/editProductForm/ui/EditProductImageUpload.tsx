import React from "react";
import { Upload } from "lucide-react";
import FormError from "../../../../../../../shared/FormError";
import type{ EditImageUploadProps } from "../types/types";

const EditProductImageUpload: React.FC<EditImageUploadProps> = ({
  errors,
  previewImage,
  selectedFile,
  handleImageChange,
  handleRemoveImage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-success font-semibold">Product Image</label>
      <div className="flex flex-col items-center gap-4 relative">
        <div className="relative">
          <img
            src={previewImage}
            alt="Product preview"
            className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
          />
          {selectedFile && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error"
            >
              ×
            </button>
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleImageChange}
          className="file-input file opacity-0 w-full absolute bottom-0"
        />
        <button className="btn btn-success btn-soft w-full">
          change image <Upload size={16} />
        </button>
      </div>
      {errors.image && <FormError message={errors.image.message} />}
    </div>
  );
};

export default EditProductImageUpload;