import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";
import type{ ImageUploadFieldProps } from "../types/types";
import FormError from "../../../../../shared/FormError";

const ImageUploadField = ({
  errors,
  imagePreview,
  handleImageChange,
  removeImage,
}: ImageUploadFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col gap-2"
    >
      <label htmlFor="image" className="label">
        <span className="label-text text-success font-semibold text-lg">
          Product Image
        </span>
      </label>

      {/* Image Preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative mb-4 inline-block"
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-success"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 btn btn-circle btn-error btn-xs"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Input */}
      <div className="relative">
        <input
          type="file"
          id="image"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button
          type="button"
          className="btn btn-outline btn-success w-full"
        >
          <Upload size={18} />
          <span>
            {imagePreview ? "Change Image" : "Upload Product Image"}
          </span>
        </button>
      </div>

      <div className="flex justify-between items-center mt-1">
        <FormError message={errors.image?.message} />
        <span className="text-sm text-base-content/60">
          JPG, PNG, WebP allowed
        </span>
      </div>
    </motion.div>
  );
};

export default ImageUploadField;