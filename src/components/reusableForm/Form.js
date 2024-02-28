import { createContext } from "react";
import cn from "../../utils/cn";

export const FormElementContext = createContext();

const Form = ({ children, onSubmit, double = false }) => {
  return (
    <FormElementContext.Provider value={{ double }}>
      <form onSubmit={onSubmit} className={cn("rounded-md max-w-full mx-3")}>
        {children}
      </form>
    </FormElementContext.Provider>
  );
};

export default Form;
