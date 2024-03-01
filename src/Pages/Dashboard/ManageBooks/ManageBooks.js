import { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../../components/Loading";
import { GoBook } from "react-icons/go";
import PageTitle from "../../../components/PageTitle";
import DeleteBook from "./DeleteBook";
import ManageBooksRow from "./ManageBooksRow";

const ManageBooks = () => {
  const [deleteBook, setDeleteBook] = useState(null);

  const {
    data: books,
    isLoading,
    refetch,
  } = useQuery("books", () =>
    fetch("https://the-story-keeper-server-ebon.vercel.app/allBooks", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  let loading;
  if (isLoading) {
    loading = <Loading />;
  }

  let manageBookContainer;
  if (books?.length > 0) {
    manageBookContainer = (
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th className="text-center">Avatar</th>
                <th className="text-center">Title</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book, index) => (
                <ManageBooksRow
                  key={book._id}
                  book={book}
                  index={index}
                  setDeleteBook={setDeleteBook}
                />
              ))}
            </tbody>
          </table>
        </div>
        {deleteBook && (
          <DeleteBook
            deleteBook={deleteBook}
            refetch={refetch}
            setDeleteBook={setDeleteBook}
          />
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
      <h2 className="text-center text-3xl my-6 second-font">
        Manage Books ({books?.length})
      </h2>

      {loading}

      {manageBookContainer}
    </div>
  );
};

export default ManageBooks;
