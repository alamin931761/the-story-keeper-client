import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TableRow from "../../../components/reusableTable/TableRow";

const Book = ({ book, index, setDeleteState }) => {
  const { imageURL, title, _id, price, availableQuantity } = book;
  const navigate = useNavigate();

  return (
    <TableRow>
      <th className="text-center">{index + 1}</th>
      <th className="text-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={imageURL} alt={title} />
          </div>
        </div>
      </th>
      <td className="text-2xl text-center second-font capitalize">{title}</td>
      <td className="text-2xl text-center second-font">${price}</td>
      <td className="text-2xl text-center second-font">{availableQuantity}</td>
      <td className="text-center">
        <button
          onClick={() => navigate(`/dashboard/books/update-book/${_id}`)}
          className="btn btn-outline transition ease-linear duration-500"
        >
          <BiEdit className="text-2xl" />
        </button>
      </td>

      <td className="text-center">
        <label
          onClick={() => setDeleteState(book)}
          htmlFor="book-delete-confirmation-modal"
          className="btn btn-outline btn-error transition ease-linear duration-500"
        >
          <MdDelete className="text-2xl" />
        </label>
      </td>
    </TableRow>
  );
};

export default Book;
