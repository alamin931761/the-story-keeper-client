import { signOut } from "firebase/auth";
import auth from "../firebase.init";

const UnauthorizedError = ({ error }) => {
  setTimeout(() => {
    localStorage.removeItem("accessToken");
    signOut(auth);
  }, 5000);

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h2 className="text-3xl text-red-500 font-semibold">
        {error?.data?.message}
      </h2>
      <p className="mt-5">You will be signed out in 5 seconds</p>
    </div>
  );
};

export default UnauthorizedError;
