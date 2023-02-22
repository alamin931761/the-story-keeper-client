import useAllBooks from '../Hooks/useAllBooks';
const useNewArrivals = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const newBooks = allBooks.filter(books => books.publication_date.includes("2023"));

    return [newBooks];
}
export default useNewArrivals;