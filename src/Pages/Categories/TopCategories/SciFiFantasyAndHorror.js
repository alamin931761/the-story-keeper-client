import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const SciFiFantasyAndHorror = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "sci-fi-fantasy-and-horror"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Sci-Fi, Fantasy & Horror"
      dataAos="fade-down"
    />
  );
};

export default SciFiFantasyAndHorror;
