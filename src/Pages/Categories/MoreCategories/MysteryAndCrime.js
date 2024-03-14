import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const MysteryAndCrime = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "mystery-and-crime"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Mystery & Crime"
      dataAos="fade-down"
    />
  );
};

export default MysteryAndCrime;
