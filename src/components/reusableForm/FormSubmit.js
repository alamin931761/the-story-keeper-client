import { useContext } from "react";
import { FormElementContext } from "./Form";
import cn from "../../utils/cn";

const FormSubmit = ({ children, className, disabled = false }) => {
  const { double } = useContext(FormElementContext);
  return (
    <div
      className={cn("grid grid-cols-1 gap-5 my-5", {
        "md:grid-cols-2": double,
      })}
    >
      <div className={className}>
        <button
          className="btn btn-outline transition ease-linear duration-500"
          type="submit"
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default FormSubmit;
