import { Link } from "react-router-dom";

const DynamicLinkButton = ({ to, children, disabled = false }) => {
  return (
    <Link
      className="btn btn-outline transition ease-linear duration-500 mb-5"
      to={to}
      disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default DynamicLinkButton;
