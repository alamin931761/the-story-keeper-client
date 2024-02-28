import { Link } from "react-router-dom";

const DynamicLink = ({ children, to, className }) => {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
};

export default DynamicLink;
