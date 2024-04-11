import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Slider from "../../../components/dataManipulation/Slider";
import Limit from "../../../components/dataManipulation/Limit";
import Sort from "../../../components/dataManipulation/Sort";
import Book from "./Book";
import Pagination from "../../../components/dataManipulation/Pagination";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import PageTitle from "../../../components/PageTitle";
import { useDeleteBookMutation } from "../../../redux/api/bookApi";
import { useState } from "react";
import useLoadBooks from "../../../Hooks/useLoadBooks";
import { GoBook } from "react-icons/go";
import { Link } from "react-router-dom";
import Table from "../../../components/reusableTable/Table";
import TableHead from "../../../components/reusableTable/TableHead";
import TableBody from "../../../components/reusableTable/TableBody";
import UnauthorizedError from "../../../components/UnauthorizedError";

const Books = () => {
  const [deleteState, setDeleteState] = useState(null);
  const [deleteBook, { isLoading: deleteBookLoading, isError, error }] =
    useDeleteBookMutation();
  const { books, count, isLoading } = useLoadBooks(
    "title,imageURL,price,availableQuantity"
  );

  if (isLoading || deleteBookLoading) {
    return <Loading />;
  }

  const handleDelete = async (bookData) => {
    const result = await deleteBook({
      id: bookData._id,
      token: localStorage.getItem("accessToken"),
    });
    toast.success(result?.data?.message);
    setDeleteState(null);
  };

  let booksContainer;
  if (count > 0) {
    booksContainer = (
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
        <div>
          <Table>
            <TableHead>
              <th className="text-center">Avatar</th>
              <th className="text-center">Title</th>
              <th className="text-center">Price</th>
              <th className="text-center">Available Quantity</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </TableHead>

            <TableBody>
              {books.map((book, index) => (
                <Book
                  key={book._id}
                  book={book}
                  index={index}
                  setDeleteState={setDeleteState}
                />
              ))}
            </TableBody>
          </Table>
          <Pagination />
        </div>

        <DeleteConfirmationModal
          modalName="book-delete-confirmation-modal"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteState?.title}</span>
            </>
          }
          deleteState={deleteState}
          handleDelete={handleDelete}
        />
      </div>
    );
  } else {
    booksContainer = (
      <div className="w-full flex flex-col items-center justify-center">
        <GoBook className="text-7xl opacity-5" />
        <p className="second-font">
          No books have been added to this website yet
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <PageTitle title="Books" />
      {isError ? (
        <UnauthorizedError error={error} />
      ) : (
        <>
          <Link
            to="/dashboard/books/add-book"
            className="btn btn-outline btn-xs lg:btn-sm transition ease-linear duration-500 absolute top-2 left-2"
          >
            Add Book
          </Link>

          <h2 className="text-center text-3xl second-font my-5">
            Books ({count})
          </h2>

          {booksContainer}
        </>
      )}
    </div>
  );
};

export default Books;
