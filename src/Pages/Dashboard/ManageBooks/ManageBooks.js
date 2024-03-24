import { useState } from "react";
import Loading from "../../../components/Loading";
import { GoBook } from "react-icons/go";
import PageTitle from "../../../components/PageTitle";
import ManageBooksRow from "./ManageBooksRow";
import useLoadBooks from "../../../Hooks/useLoadBooks";
import Pagination from "../../../components/dataManipulation/Pagination";
import Slider from "../../../components/dataManipulation/Slider";
import Limit from "../../../components/dataManipulation/Limit";
import Sort from "../../../components/dataManipulation/Sort";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { toast } from "react-toastify";
import { useDeleteBookMutation } from "../../../redux/api/bookApi";

const ManageBooks = () => {
  const [deleteState, setDeleteState] = useState(null);
  const [deleteBook, { isLoading: deleteBookLoading }] =
    useDeleteBookMutation();
  const { books, count, isLoading } = useLoadBooks(
    "title,imageURL,price,availableQuantity"
  );

  if (isLoading || deleteBookLoading) {
    return <Loading />;
  }

  const handleDelete = async (bookData) => {
    const result = await deleteBook(bookData._id);
    toast.success(result.data.message);
    setDeleteState(null);
  };

  let manageBookContainer;
  if (count > 0) {
    manageBookContainer = (
      <div>
        <div className="mx-2">
          {/* filter books */}
          <Slider />
          <div className="second-font flex justify-end items-center flex-wrap">
            <Limit />
            <Sort className="w-[290px]">
              <option value="availableQuantity">Default</option>
              <option value="price">Price (Low - High)</option>
              <option value="-price">Price (High - Low)</option>
              <option value="title">Title (A - Z)</option>
              <option value="-title">Title (Z - A)</option>
              <option value="-createdAt">Newest - Oldest</option>
              <option value="createdAt">Oldest - Newest</option>
              <option value="-availableQuantity">
                Available Quantity (Highest - Lowest)
              </option>
              <option value="availableQuantity">
                Available Quantity (Lowest - Highest)
              </option>
            </Sort>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th className="text-center">Avatar</th>
                <th className="text-center">Title</th>
                <th className="text-center">Price</th>
                <th className="text-center">Available Quantity</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <ManageBooksRow
                  key={book._id}
                  book={book}
                  index={index}
                  setDeleteState={setDeleteState}
                />
              ))}
            </tbody>
          </table>

          <Pagination />
        </div>

        <DeleteConfirmationModal
          modalName="book-delete-confirmation-modal"
          message={
            <>
              Are you sure you want to delete this{" "}
              <span className="font-semibold">{deleteState?.title}</span>
            </>
          }
          deleteState={deleteState}
          handleDelete={handleDelete}
        />
      </div>
    );
  } else {
    manageBookContainer = (
      <div className="w-full mt-5 flex flex-col items-center justify-center">
        <GoBook className="text-7xl opacity-5" />
        <p className="second-font">
          No books have been added to this website yet
        </p>
      </div>
    );
  }

  return (
    <div data-aos="fade-right" data-aos-duration="1000">
      <PageTitle title="Manage Books" />
      <h2 className="text-center text-3xl mt-5 second-font">
        Manage Books ({count})
      </h2>

      {manageBookContainer}
    </div>
  );
};

export default ManageBooks;
