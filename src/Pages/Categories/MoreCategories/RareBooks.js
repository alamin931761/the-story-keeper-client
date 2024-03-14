import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const RareBooks = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "rare-books"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Rare Books"
      dataAos="fade-down"
    />
  );
};

export default RareBooks;
