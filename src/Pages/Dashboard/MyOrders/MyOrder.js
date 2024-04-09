import TableRow from "../../../components/reusableTable/TableRow";

const MyOrder = ({ data, index }) => {
  const {
    orderId,
    books,
    deliveryAddress,
    deliveryCharge,
    email,
    name,
    phoneNumber,
    tax,
    discount,
    total,
    transactionId,
    status,
    createdAt,
  } = data;
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

      <td className="text-center capitalize">{status}</td>
    </TableRow>
  );
};

export default MyOrder;
