import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const Essays = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "essays"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Essays"
      dataAos="fade-up"
    />
  );
};

export default Essays;
