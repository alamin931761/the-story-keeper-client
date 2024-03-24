import { useEffect, useState } from "react";

const useShoppingCart = () => {
  const [savedCart, setSavedCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const shoppingCart = JSON.parse(localStorage.getItem("shopping-cart"));
      const cartItems = [];
      let totalQuantity = 0;
      let subtotal = 0;

      for (const id in shoppingCart) {
        const response = await fetch(
          `http://localhost:5000/api/v1/books/${id}`
        );
        const data = await response.json();
        const bookQuantity = parseInt(shoppingCart[id]);
        totalQuantity += bookQuantity;
        const bookSubtotal = data.data.data.price * bookQuantity;
        subtotal += bookSubtotal;
        const book = { ...data.data.data, bookQuantity, bookSubtotal };
        cartItems.push(book);
      }
      setSavedCart(cartItems);
      setQuantity(totalQuantity);
      setSubTotal(subtotal);
    };

    fetchData();
  }, [savedCart]);

  return { savedCart, quantity, subtotal };
};
export default useShoppingCart;
