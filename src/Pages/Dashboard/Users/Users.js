import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import User from "./User";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";
import Table from "../../../components/reusableTable/Table";
import TableHead from "../../../components/reusableTable/TableHead";
import TableBody from "../../../components/reusableTable/TableBody";
import UnauthorizedError from "../../../components/UnauthorizedError";

const Users = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery({
    token: localStorage.getItem("accessToken"),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className="min-h-screen"
    >
      <PageTitle title="Users" />

      {isError ? (
        <UnauthorizedError error={error} />
      ) : (
        <>
          <h2 className="text-center text-3xl my-5 second-font">
            Users ({data?.data?.data?.count || 0})
          </h2>

          <Table>
            <TableHead>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Make Admin</th>
              <th className="text-center">Remove Admin</th>
            </TableHead>

            <TableBody>
              {data?.data?.data?.users?.map((allUser, index) => (
                <User key={allUser._id} allUser={allUser} index={index} />
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Users;
