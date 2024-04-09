import { MdDelete } from "react-icons/md";
import TableRow from "../../components/reusableTable/TableRow";

const CartTableRow = ({ data, index, setDeleteState }) => {
  const { imageURL, title, author, price, bookQuantity, bookSubtotal } = data;

  return (
    <TableRow>
      <th className="text-center">{index + 1}</th>
      <th>
        <label
          onClick={() => setDeleteState(data)}
          htmlFor="cart-delete-confirmation-modal"
          className="btn btn-circle btn-outline btn-error"
        >
          <MdDelete className="text-3xl" />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={imageURL} alt={title} />
            </div>
          </div>
          <div>
            <div className="font-bold text-xl second-font capitalize">
              {title}
            </div>
            <div className="text-sm opacity-50 uppercase">{author}</div>
          </div>
        </div>
      </td>
      <td className="text-center">${price}</td>
      <td className="text-center">{bookQuantity}</td>
      <td className="text-center">${bookSubtotal}</td>
    </TableRow>
  );
};

export default CartTableRow;
