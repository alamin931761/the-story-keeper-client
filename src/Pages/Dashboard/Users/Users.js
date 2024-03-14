import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import User from "./User";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";

const Users = () => {
  const { data, isLoading } = useGetAllUsersQuery();

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
      <h2 className="text-center text-3xl my-5 second-font">
        Users ({data?.data?.data?.count})
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Make Admin</th>
              <th className="text-center">Remove Admin</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data?.users?.map((allUser, index) => (
              <User key={allUser._id} allUser={allUser} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
