import { useState } from "react";
import Loading from "../../../components/Loading";
import { GoBook } from "react-icons/go";
import PageTitle from "../../../components/PageTitle";
import DeleteBook from "./DeleteBook";
import ManageBooksRow from "./ManageBooksRow";
import Pagination from "../../../components/Pagination";
import FilterBooks from "../../../components/FilterBooks";
import useLoadBooks from "../../../Hooks/useLoadBooks";

const ManageBooks = () => {
  const [deleteBook, setDeleteBook] = useState(null);
  const { books, count, isLoading } = useLoadBooks(
    "title,imageURL,price,availableQuantity"
  );

  if (isLoading) {
    return <Loading />;
  }

  let manageBookContainer;
  if (count > 0) {
    manageBookContainer = (
      <div>
        <div className="mx-2">
          <FilterBooks />
        </div>
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
                  setDeleteBook={setDeleteBook}
                />
              ))}
            </tbody>
          </table>

          <Pagination />
        </div>
        {deleteBook && (
          <DeleteBook deleteBook={deleteBook} setDeleteBook={setDeleteBook} />
        )}
      </div>
    );
  } else {
    manageBookContainer = (
      <div className="w-full mt-6 flex flex-col items-center justify-center">
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
