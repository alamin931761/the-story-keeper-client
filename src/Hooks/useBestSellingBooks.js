import useAllBooks from "./useAllBooks";

const useBestSellingBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const bestsellingBooks = allBooks.filter(book => book.bestSellingBook === true);
    return [bestsellingBooks]
};
export default useBestSellingBooks;