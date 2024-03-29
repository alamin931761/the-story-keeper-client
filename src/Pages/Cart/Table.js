import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Modal from "../../components/Modal";

const Table = ({ data, deleteBook, index }) => {
  const { image, title, author, price, _id, quantity, subtotal } = data;

  // delete
  const handleDeleteButton = (id) => {
    deleteBook(id);
  };

  return (
    <>
      <tr>
        <th className="text-center">{index + 1}</th>
        <th>
          <label
            htmlFor="cart-delete-confirmation-modal"
            className="btn btn-circle btn-outline btn-error"
          >
            <MdDelete className="text-3xl" />
          </label>
        </th>
        <td>
          <div className="flex itemscart-delete-confirmation-modal-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold text-xl second-font">{title}</div>
              <div className="text-sm opacity-50">{author}</div>
            </div>
          </div>
        </td>
        <td className="text-center">${price}</td>
        <td className="text-center">{quantity}</td>
        <td className="text-center">${subtotal}</td>
      </tr>

      <Modal
        modalName="cart-delete-confirmation-modal"
        title={
          <h3 className="text-lg text-red-500 second-font text-start">
            Are you sure you want to delete{" "}
            <span className="font-bold">{title}</span>?
          </h3>
        }
      >
        <div className="modal-action">
          <button
            onClick={() => handleDeleteButton(_id)}
            className="btn btn-outline btn-error mb-1 transition ease-linear duration-500"
          >
            <MdDelete className="text-2xl mr-2" />
            Delete
          </button>
          <label
            htmlFor="cart-delete-confirmation-modal"
            className="btn btn-outline transition ease-linear duration-500"
          >
            <ImCross className="text-xl mr-2 mb-1" />
            Cancel
          </label>
        </div>
      </Modal>
    </>
  );
};

export default Table;
