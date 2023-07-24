import useAllBooks from "./useAllBooks";

const useShoppingCart = () => {
    const [allBooks, setAllBooks] = useAllBooks();
    const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));

    let savedCart = [];
    for (const id in shoppingCart) {
        const addedBook = allBooks.find(book => book._id === id);
        if (addedBook) {
            const quantity = shoppingCart[id];
            addedBook.quantity = quantity;
            addedBook.subtotal = addedBook.price * quantity;
            savedCart.push(addedBook);
        }
    }
    return { savedCart };
}
export default useShoppingCart;