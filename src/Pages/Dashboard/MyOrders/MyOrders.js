import Loading from "../../../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useGetUserOrdersQuery } from "../../../redux/api/orderApi";
import Table from "../../../components/reusableTable/Table";
import TableHead from "../../../components/reusableTable/TableHead";
import TableBody from "../../../components/reusableTable/TableBody";
import { GoBook } from "react-icons/go";
import MyOrder from "./MyOrder";
import PageTitle from "../../../components/PageTitle";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const email = user.email;
  const { data, isLoading } = useGetUserOrdersQuery(email);
  if (isLoading) {
    return <Loading />;
  }

  let orderContainer;
  if (data?.data?.data.length > 0) {
    orderContainer = (
      <Table>
        <TableHead>
          <th className="text-center">Order ID</th>
          <th className="text-center">Date and Time</th>
          <th className="text-center">Book Description</th>
          <th className="text-center">Tax</th>
          <th className="text-center">Delivery Charge</th>
          <th className="text-center">Discount</th>
          <th className="text-center">Total</th>
          <th className="text-center">Transaction Id</th>
          <th className="text-center">Delivery Details</th>
          <th className="text-center">Status</th>
        </TableHead>

        <TableBody>
          {data?.data?.data.map((data, index) => (
            <MyOrder key={data._id} data={data} index={index} />
          ))}
        </TableBody>
      </Table>
    );
  } else {
    orderContainer = (
      <div className="w-full mt-5 flex flex-col items-center justify-center">
        <GoBook className="text-7xl opacity-5" />
        <p className="second-font">You haven't ordered yet</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <PageTitle title="My Orders" />
      <h2 className="text-center text-3xl my-5 second-font">
        My Orders({data?.data?.data.length})
      </h2>
      {orderContainer}
    </div>
  );
};

export default MyOrders;
