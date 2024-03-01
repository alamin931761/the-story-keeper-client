import { Link } from "react-router-dom";

const DynamicLink = ({ children, to }) => {
  return (
    <Link
      className="text-blue-500 cursor-pointer hover:decoration-wavy
      underline underline-offset-2 hover:text-blue-600 transition ease-linear duration-500 second-font"
      to={to}
    >
      {children}
    </Link>
  );
};

export default DynamicLink;
