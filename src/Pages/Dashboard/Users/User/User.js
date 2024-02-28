import { toast } from "react-toastify";
import auth from "../../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const User = ({ allUser, index, refetch }) => {
  const { email, role } = allUser;
  const [user] = useAuthState(auth);

  // make admin
  const makeAdmin = (emailAddress) => {
    fetch(
      `https://the-story-keeper-server-ebon.vercel.app/user/admin/${emailAddress}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          toast.error("Failed to make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast("Successfully made an admin");
        }
      });
  };

  // remove admin
  const removeAdmin = (emailAddress) => {
    fetch(
      `https://the-story-keeper-server-ebon.vercel.app/user/admin/${emailAddress}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          toast.error("Failed to remove an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast("Successfully remove an admin");
        }
      });
  };
  // delete user
  const deleteUser = (emailAddress, role) => {
    if (role === "admin" && user.email !== "alamin931761@gmail.com") {
      toast.error(`You can't remove an admin`);
    } else {
      fetch(
        `https://the-story-keeper-server-ebon.vercel.app/user/${emailAddress}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 403 || res.status === 401) {
            toast.error("Failed to delete an user");
          }
          return res.json();
        })
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`User deleted successfully`);
            refetch();
          }
        });
    }
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td className="text-center">{email}</td>
      <td className="text-center">
        {role !== "admin" && user.email === "alamin931761@gmail.com" && (
          <button
            onClick={() => makeAdmin(email)}
            className="btn btn-xs btn-outline btn-success transition ease-linear duration-500"
          >
            Make Admin
          </button>
        )}
      </td>

      <td className="text-center">
        {role === "admin" &&
          email !== "alamin931761@gmail.com" &&
          user.email === "alamin931761@gmail.com" && (
            <button
              onClick={() => removeAdmin(email)}
              className="btn btn-xs btn-outline transition ease-linear duration-500"
            >
              Remove Admin
            </button>
          )}
      </td>
      <td className="text-center">
        {email !== "alamin931761@gmail.com" && email !== user.email && (
          <button
            onClick={() => deleteUser(email, role)}
            className="btn btn-xs btn-outline btn-error transition ease-linear duration-500"
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};

export default User;
