import useLoadBooks from "../../../Hooks/useLoadBooks";
import BooksCardContainer from "../../../components/BooksCardContainer";

const ArtsAndMusic = () => {
  const { books, count, isLoading } = useLoadBooks(
    "imageURL,title,author,price",
    "arts-and-music"
  );

  return (
    <BooksCardContainer
      isLoading={isLoading}
      books={books}
      count={count}
      name="Arts & Music"
      dataAos="fade-up"
    />
  );
};

export default ArtsAndMusic;
