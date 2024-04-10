import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useGetSingleUserQuery,
  useUpdateRoleMutation,
} from "../../../redux/api/userApi";
import Loading from "../../../components/Loading";
import TableRow from "../../../components/reusableTable/TableRow";

const User = ({ allUser, index }) => {
  const { email, role } = allUser;
  const [user] = useAuthState(auth);
  const { data, isLoading } = useGetSingleUserQuery({
    email: user.email,
    token: localStorage.getItem("accessToken"),
  });
  const [updateRole, { isLoading: updateRoleLoading }] =
    useUpdateRoleMutation();

  if (isLoading || updateRoleLoading) {
    return (
      <div className="flex justify-center items-center w-[95vw]">
        <Loading />
      </div>
    );
  }

  const currentUserRole = data.data.data.role;

  //   make admin
  const makeAdmin = async (email) => {
    const options = {
      email,
      role: { role: "admin" },
      token: localStorage.getItem("accessToken"),
    };
    const result = await updateRole(options);
    if (result?.data?.success) {
      toast.info("Successfully made an admin");
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
  };

  //   remove admin
  const removeAdmin = async (email) => {
    const options = {
      email,
      role: { role: "user" },
      token: localStorage.getItem("accessToken"),
    };

    const result = await updateRole(options);
    if (result?.data?.success) {
      toast.info("Successfully made an user");
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
  };

  return (
    <TableRow>
      <th>{index + 1}</th>
      <td className="text-center">{email}</td>
      <td className="text-center capitalize">
        {role === "superAdmin" ? "super admin" : role}
      </td>

      {currentUserRole === "superAdmin" ? (
        <td className="text-center">
          {role === "user" && (
            <button
              onClick={() => makeAdmin(email)}
              className="btn btn-xs btn-outline btn-success transition ease-linear duration-500"
            >
              Make Admin
            </button>
          )}
        </td>
      ) : (
        <td />
      )}

      {currentUserRole === "superAdmin" ? (
        <td className="text-center">
          {role === "admin" && (
            <button
              onClick={() => removeAdmin(email)}
              className="btn btn-xs btn-outline transition ease-linear duration-500"
            >
              Remove Admin
            </button>
          )}
        </td>
      ) : (
        <td />
      )}
    </TableRow>
  );
};

export default User;
