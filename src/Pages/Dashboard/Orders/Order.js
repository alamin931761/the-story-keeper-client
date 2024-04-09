import Loading from "../../../components/Loading";
import TableRow from "../../../components/reusableTable/TableRow";
import { useUpdateOrderStatusMutation } from "../../../redux/api/orderApi";
import { toast } from "react-toastify";

const Order = ({ data, index }) => {
  const [updateOrderStatus, { isLoading, error }] =
    useUpdateOrderStatusMutation();
  const {
    orderId,
    books,
    deliveryAddress,
    deliveryCharge,
    email,
    name,
    phoneNumber,
    _id,
    tax,
    discount,
    total,
    transactionId,
    status,
    createdAt,
  } = data;

  // handle status
  const handleStatus = async (id) => {
    const result = await updateOrderStatus(id);
    if (result?.data?.success) {
      toast.info(result?.data?.message);
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TableRow>
      <th className="text-center">{index + 1}</th>
      <td className="text-center">{orderId}</td>
      <td>
        <p>Date: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Time: {new Date(createdAt).toLocaleTimeString()}</p>
      </td>

      {/* book details */}
      <td>
        {books.map((book) => (
          <div className="flex items-center">
            <div className="avatar mr-2 my-2">
              <div className="w-24 rounded-xl">
                <img src={book.imageURL} alt={book.title} />
              </div>
            </div>
            <ol>
              <li className="capitalize">title: {book.title}</li>
              <li className="capitalize">Price: ${book.price}</li>
              <li className="capitalize">
                quantity: {book.quantity}{" "}
                {book.quantity > 1 ? "pieces" : "piece"}
              </li>
              <li className="capitalize">
                subtotal: ${book.price * book.quantity}
              </li>
            </ol>
          </div>
        ))}
      </td>

      <td className="text-center">${tax}</td>
      <td className="text-center">${deliveryCharge}</td>
      <td className="text-center">${discount}</td>
      <td className="text-center">${total}</td>
      <td className="text-center">{transactionId}</td>

      {/* delivery details */}
      <td>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Address: {deliveryAddress}</p>
      </td>

      <td className="text-center">
        <button
          onClick={() => handleStatus(_id)}
          disabled={status === "shipped"}
          className="btn btn-outline transition ease-linear duration-500"
        >
          {status}
        </button>
      </td>
    </TableRow>
  );
};

export default Order;
