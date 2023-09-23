import useAllBooks from '../Hooks/useAllBooks';
const useNewArrivals = () => {
    const { allBooks } = useAllBooks();
    const today = new Date();
    const year = today.getFullYear().toString();
    const newBooks = allBooks.filter(books => books.publication_date.includes(`${year}`));

    return [newBooks];
}
export default useNewArrivals;