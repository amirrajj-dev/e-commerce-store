import FormError from "../../../../../shared/FormError";

interface PriceFieldProps {
  register: any;
  errors: any;
}

const PriceField = ({ register, errors }: PriceFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="price" className="label">
        <span className="label-text text-success font-semibold text-lg">
          Price ($)
        </span>
      </label>
      <input
        type="number"
        id="price"
        step="0.01"
        {...register("price", { valueAsNumber: true })}
        className={`input input-bordered w-full focus:outline-none transition-all ${
          errors.price
            ? "input-error"
            : "input-success focus:ring-2 focus:ring-success/20"
        }`}
        placeholder="0.00"
      />
      <FormError message={errors.price?.message} />
    </div>
  );
};

export default PriceField;