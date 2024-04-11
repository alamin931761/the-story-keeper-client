import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { signOut } from "firebase/auth";
import { useGetSingleUserQuery } from "../../redux/api/userApi";

const RequireSuperAdmin = ({ children }) => {
  const [user] = useAuthState(auth);
  const { data, isLoading } = useGetSingleUserQuery({
    email: user?.email,
  });
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (data?.data?.data?.role !== "superAdmin") {
    signOut(auth);
    return (
      <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
    );
  }

  return children;
};

export default RequireSuperAdmin;
