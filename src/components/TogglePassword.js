export const TogglePassword = ({ state, setState }) => {
  return (
    <div className="flex items-center w-full max-w-lg">
      <input
        onClick={() => setState(!state)}
        className="checkbox"
        id="password-toggle"
        type="checkbox"
      />
      <label
        className="ml-2 my-0 cursor-pointer capitalize"
        htmlFor="password-toggle"
      >
        show password
      </label>
    </div>
  );
};
