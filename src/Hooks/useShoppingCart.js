import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useShoppingCart = () => {
  const [savedCart, setSavedCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [bookIdAndQuantity, setBookIdAndQuantity] = useState([]);
  const { shoppingCart } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    let bookQuantity = 0;
    let bookSubtotal = 0;
    const idAndQuantity = [];
    const cartItems = [];

    for (const book of shoppingCart) {
      bookQuantity += book.bookQuantity;
      bookSubtotal += book.bookSubtotal;
      idAndQuantity.push({ bookId: book._id, quantity: book.bookQuantity });
      cartItems.push(book);
    }
    setSavedCart(cartItems);
    setQuantity(bookQuantity);
    setSubtotal(bookSubtotal);
    setBookIdAndQuantity(idAndQuantity);
  }, [shoppingCart]);

  return { savedCart, quantity, subtotal, bookIdAndQuantity };
};
export default useShoppingCart;
