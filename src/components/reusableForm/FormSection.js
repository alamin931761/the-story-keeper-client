import { useContext } from "react";
import { FormElementContext } from "./Form";
import cn from "../../utils/cn";

const FormSection = ({ children }) => {
  const { double } = useContext(FormElementContext);

  return (
    <div
      className={cn("grid grid-cols-1 gap-5 justify-center", {
        "md:grid-cols-2": double,
      })}
    >
      {children}
    </div>
  );
};

export default FormSection;
