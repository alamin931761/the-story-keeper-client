import useAllBooks from "./useAllBooks";

const useTopRatedBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);

    const allReviewedBooks = allBooks?.filter(review => review.reviews);

    let topRatedBooksArray = [];
    for (const books of allReviewedBooks) {

        // rating calculation 
        const ratingsArray = (books.reviews).map(book => book.rating);
        const totalReview = ratingsArray.length;
        let totalRating = 0;
        for (const rating of ratingsArray) {
            totalRating = rating + totalRating;
        }
        const averageRating = (totalRating / totalReview).toFixed(1);

        if (averageRating >= 3) {
            topRatedBooksArray.push(books);
        }
    }

    return [topRatedBooksArray];
}
export default useTopRatedBooks;