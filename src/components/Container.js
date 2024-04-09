import cn from "../utils/cn";

const Container = ({ children, className }) => {
  return (
    // <div className={cn("w-full max-w-[1250px] mx-auto bg-red-100", className)}>
    <div className={cn("w-full mx-auto", className)}>{children}</div>
  );
};

export default Container;
