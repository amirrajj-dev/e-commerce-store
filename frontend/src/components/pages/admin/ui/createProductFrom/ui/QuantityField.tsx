import FormError from "../../../../../shared/FormError";

interface QuantityFieldProps {
  register: any;
  errors: any;
}

const QuantityField = ({ register, errors }: QuantityFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quantity" className="label">
        <span className="label-text text-success font-semibold text-lg">
          Stock Quantity
        </span>
      </label>
      <input
        type="number"
        id="quantity"
        {...register("quantity", { valueAsNumber: true })}
        className={`input input-bordered w-full focus:outline-none transition-all ${
          errors.quantity
            ? "input-error"
            : "input-success focus:ring-2 focus:ring-success/20"
        }`}
        placeholder="0"
      />
      <FormError message={errors.quantity?.message} />
    </div>
  );
};

export default QuantityField;