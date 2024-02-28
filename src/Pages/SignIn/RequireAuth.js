import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../../components/Loading";

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);

  if (loading || sending) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>
    );
  }

  if (error) {
    toast.error(error.message);
  }

  // email verification
  if (user.providerData[0].providerId === "password" && !user.emailVerified) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="text-red-400 text-4xl">Your email is not verified!</h2>
        <h3 className="text-2xl mt-3 mb-3">
          Please verify your email address.
        </h3>
        <button
          className="btn btn-active btn-accent"
          onClick={async () => {
            const success = await sendEmailVerification();
            if (success) {
              toast.info("Verification email sent successfully");
            }
          }}
        >
          Verify Your Email Address
        </button>
        <p className="text-info my-3">
          Sign in again after verifying the email address
        </p>
      </div>
    );
  }
  return children;
};

export default RequireAuth;
