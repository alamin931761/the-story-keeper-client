import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Modal from "../../../components/Modal";

const DeleteBook = ({ deleteBook, refetch, setDeleteBook }) => {
  const handleDelete = (id) => {
    fetch(`https://the-story-keeper-server-ebon.vercel.app/allBooks/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        return res.json();
      })
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`${deleteBook.title} has been successfully deleted.`);
          setDeleteBook(null);
          refetch();
        }
      });
  };

  return (
    <div>
      <Modal
        modalName="delete-confirm-modal"
        title={
          <h3 className="text-xl text-red-500 text-start">
            Are you sure you want to delete{" "}
            <span className="font-bold">{deleteBook.title}</span>?
          </h3>
        }
      >
        <div className="modal-action">
          <button
            onClick={() => handleDelete(deleteBook._id)}
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
