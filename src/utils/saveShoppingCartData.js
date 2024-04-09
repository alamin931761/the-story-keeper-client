// use local storage to manage cart data

// get the shopping cart data from local storage
const getShoppingCart = () => {
  let shoppingCart;

  const storedCart = localStorage.getItem("shopping-cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  } else {
    shoppingCart = {};
  }
  return shoppingCart;
};

// add cart data to local storage
const addToStorage = (id, bookQuantity) => {
  let shoppingCart = getShoppingCart();
  // add quantity
  shoppingCart[id] = bookQuantity;
  localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};

// remove data from local storage
const removeFromStorage = (id) => {
  const shoppingCart = getShoppingCart();
  if (id in shoppingCart) {
    delete shoppingCart[id];
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  }
};

// clear shopping cart
const deleteShoppingCart = () => {
  localStorage.removeItem("shopping-cart");
};

export { getShoppingCart, addToStorage, removeFromStorage, deleteShoppingCart };
