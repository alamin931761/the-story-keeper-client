const Input = ({
  name,
  label,
  errors,
  type,
  register,
  value = undefined,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <label className="block capitalize mb-2 ml-1 text-sm" htmlFor={`${name}`}>
        {label}
      </label>

      <input
        type={type}
        id={name}
        {...register}
        value={value}
        className="input input-bordered w-full"
        disabled={disabled}
      />
      {errors[name] && (
        <p className="text-xs ml-1 text-red-500 mt-[6px]">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Input;
