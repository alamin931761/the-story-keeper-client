const Textarea = ({ name, errors, register, label }) => {
  return (
    <div className="w-full">
      <label className="block capitalize mb-2 ml-1" htmlFor={`${name}`}>
        {label}
      </label>

      <textarea
        {...register}
        cols="30"
        rows="5"
        className="textarea textarea-bordered w-full border"
      ></textarea>

      {errors[name] && (
        <p className="text-xs text-red-500 ml-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Textarea;
