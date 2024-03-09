export const Select = ({
  label,
  register,
  name,
  errors,
  value = "",
  disabled = false,
}) => {
  // value
  let selectedValue = "";
  if (value === "essays") {
    selectedValue = "Essays";
  } else if (value === "fiction") {
    selectedValue = "Fiction";
  } else if (value === "non-fiction") {
    selectedValue = "Non-Fiction";
  } else if (value === "sci-fi-fantasy-and-horror") {
    selectedValue = "Sci-Fi, Fantasy & Horror";
  } else if (value === "arts-and-music") {
    selectedValue = "Arts & Music";
  } else if (value === "mystery-and-crime") {
    selectedValue = "Mystery & Crime";
  } else if (value === "poetry") {
    selectedValue = "Poetry";
  } else if (value === "rare-books") {
    selectedValue = "Rare Books";
  }

  return (
    <div>
      <label className="block capitalize mb-2 ml-1" htmlFor={`${name}`}>
        {label}
      </label>
      <select
        disabled={disabled}
        {...register}
        className="select select-bordered w-full"
      >
        <option value="" className="text-gray-500">
          {selectedValue ? selectedValue : "Select a category"}
        </option>
        <option value="essays">Essays</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="sci-fi-fantasy-and-horror">
          Sci-Fi, Fantasy & Horror
        </option>
        <option value="arts-and-music">Arts & Music</option>
        <option value="mystery-and-crime">Mystery & Crime</option>
        <option value="poetry">Poetry</option>
        <option value="rare-books">Rare Books</option>
      </select>

      {errors[name] && (
        <p className="text-xs text-red-500 ml-1 mt-[6px]">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
