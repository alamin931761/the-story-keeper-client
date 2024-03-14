import useLoadBooks from "../../Hooks/useLoadBooks";
import BooksCardContainer from "../../components/BooksCardContainer";

const AllBooks = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="All Books"
      dataAos="fade-up"
    />
  );
};

export default AllBooks;
