import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { ImCross } from "react-icons/im";

const DeleteConfirmationModal = ({
  modalName,
  message,
  deleteState,
  handleDelete,
}) => {
  return (
    <Modal
      modalName={modalName}
      title={<span className="text-xl text-red-500">{message}?</span>}
    >
      <div className="modal-action">
        <button
          onClick={() => handleDelete(deleteState)}
          className="btn btn-outline btn-error transition ease-linear duration-500"
        >
          <MdDelete className="text-2xl mr-2" />
          Delete
        </button>
        <label
          htmlFor={modalName}
          className="btn btn-outline transition ease-linear duration-500"
        >
          <ImCross className="text-xl mr-2 mb-1" />
          Cancel
        </label>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
