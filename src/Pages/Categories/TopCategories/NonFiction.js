import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const NonFiction = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "non-fiction"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Non-Fiction"
      dataAos="fade-up"
    />
  );
};

export default NonFiction;
