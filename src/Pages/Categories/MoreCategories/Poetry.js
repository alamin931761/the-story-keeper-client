import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const Poetry = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "poetry"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Poetry"
      dataAos="fade-up"
    />
  );
};

export default Poetry;
