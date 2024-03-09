import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Modal from "../../../components/Modal";
import { useDeleteBookMutation } from "../../../redux/api/bookApi";
import Loading from "../../../components/Loading";

const DeleteBook = ({ deleteBook: deleteBookState, setDeleteBook }) => {
  const [deleteBook, { isLoading }] = useDeleteBookMutation();
  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = async (id) => {
    const result = await deleteBook(id);
    toast.success(result.data.message);
    setDeleteBook(null);
  };

  return (
    <div>
      <Modal
        modalName="delete-confirm-modal"
        title={
          <span className="text-xl text-red-500 text-start">
            Are you sure you want to delete{" "}
            <span className="font-bold">{deleteBookState.title}</span>?
          </span>
        }
      >
        <div className="modal-action">
          <button
            onClick={() => handleDelete(deleteBookState._id)}
            className="btn btn-outline btn-error transition ease-linear duration-500"
          >
            <MdDelete className="text-2xl mr-2" />
            Delete
          </button>
          <label
            htmlFor="delete-confirm-modal"
            className="btn btn-outline transition ease-linear duration-500"
          >
            <ImCross className="text-xl mr-2 mb-1" />
            Cancel
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteBook;
