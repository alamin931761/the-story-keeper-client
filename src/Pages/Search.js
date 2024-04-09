import useLoadBooks from "../Hooks/useLoadBooks";
import BooksCardContainer from "../components/BooksCardContainer";
import { useSelector } from "react-redux";
import DynamicLinkButton from "../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

const Search = () => {
  const { searchTerm } = useSelector((state) => state.searchSlice);
  console.log(searchTerm);
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "",
    searchTerm
  );

  return (
    <div className="min-h-screen">
      {books?.length === 0 ? (
        <div>
          <h2 className="text-3xl text-center second-font my-5">
            No Results Found For:{" "}
            <span className="text-red-500">{searchTerm}</span>
          </h2>

          <div className="flex justify-center">
            <DynamicLinkButton to="/">
              <MdKeyboardBackspace className="text-2xl mr-2" />
              Back To Home
            </DynamicLinkButton>
          </div>
        </div>
      ) : (
        <div>
          <BooksCardContainer
            isLoading={isLoading}
            books={books}
            count={count}
            name="Search"
            dataAos="fade-up"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
