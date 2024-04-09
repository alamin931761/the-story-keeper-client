import Loading from "../../../components/Loading";
import { GoBook } from "react-icons/go";
import PageTitle from "../../../components/PageTitle";
import Order from "./Order";
import { useGetAllOrdersQuery } from "../../../redux/api/orderApi";
import Table from "../../../components/reusableTable/Table";
import TableHead from "../../../components/reusableTable/TableHead";
import TableBody from "../../../components/reusableTable/TableBody";

const Orders = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
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
            <Order key={data._id} data={data} index={index} />
          ))}
        </TableBody>
      </Table>
    );
  } else {
    orderContainer = (
      <div className="w-full mt-5 flex flex-col items-center justify-center">
        <GoBook className="text-7xl opacity-5" />
        <p className="second-font">No one has ordered yet</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <PageTitle title="Orders" />
      <h2 className="text-center text-3xl my-5 second-font">
        Orders({data?.data?.data.length})
      </h2>
      {orderContainer}
    </div>
  );
};

export default Orders;
