// import { signOut } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Navigate, useLocation } from "react-router-dom";
// import auth from "../../firebase.init";
// import useAdmin from "../../Hooks/useAdmin";
// import Loading from "../../components/Loading";

// const RequireAdmin = ({ children }) => {
//   const [user, loading] = useAuthState(auth);
//   const [admin, adminLoading] = useAdmin(user);
//   const location = useLocation();

//   if (loading || adminLoading) {
//     return <Loading />;
//   }

//   if (!user || !admin) {
//     signOut(auth);
//     return (
//       <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
//     );
//   }
//   return children;
// };

// export default RequireAdmin;
