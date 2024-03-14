import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const Fiction = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "fiction"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Fiction"
      dataAos="fade-down"
    />
  );
};

export default Fiction;
