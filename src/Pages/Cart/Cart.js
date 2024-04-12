import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsBagCheck } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { GoBook } from "react-icons/go";
import useShoppingCart from "../../Hooks/useShoppingCart";
import PageTitle from "../../components/PageTitle";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import Container from "../../components/Container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyCouponSchema } from "../../components/reusableForm/Validation";
import { useVerifyCouponMutation } from "../../redux/api/couponApi";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { info } from "../../redux/features/orderInfoSlice";
import Table from "../../components/reusableTable/Table";
import TableHead from "../../components/reusableTable/TableHead";
import TableBody from "../../components/reusableTable/TableBody";
import CartTableRow from "./CartTableRow";
import {
  clearCart,
  removeFromCart,
} from "../../redux/features/shoppingCartSlice";

const Cart = () => {
  const { savedCart, subtotal, bookIdAndQuantity } = useShoppingCart();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState(false);
  const [deleteState, setDeleteState] = useState(null);
  const [verifyCoupon, { isLoading, error }] = useVerifyCouponMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(applyCouponSchema) });
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();

  // delete the book from the shopping cart
  const handleDelete = (book) => {
    dispatch(removeFromCart(book._id));
    toast.success(
      <p>
        <span className="font-semibold capitalize">{book.title} </span>has been
        removed from your cart.
      </p>
    );
    setDeleteState(null);
  };

  // clear shopping cart
  const clearShoppingCart = () => {
    dispatch(clearCart());
  };

  // verify coupon
  const handleVerifyCoupon = async (code) => {
    const result = await verifyCoupon(code);
    if (result?.data?.success) {
      toast.info(result?.data?.message);

      setDiscount(
        parseFloat(
          ((result?.data?.data?.data?.discount / 100) * subtotal).toFixed(2)
        )
      );
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
    reset();
  };

  let errorMessage;
  if (error) {
    errorMessage = error.data.message;
  }
  if (errors.code) {
    errorMessage = errors.code.message;
  }

  if (isLoading) {
    return <Loading />;
  }

  // DeliveryCharge
  const handleDeliveryCharge = (event) => {
    const cost = parseInt(event.target.value);
    setDeliveryCharge(cost);
    if (cost === 5) {
      setDeliveryOptionSelected(true);
    }
    if (cost === 10) {
      setDeliveryOptionSelected(true);
    }
  };

  const tax = parseFloat((subtotal * 0.05).toFixed(2)); // 5% tax
  // total
  const total = parseFloat(
    (subtotal + tax + deliveryCharge - discount).toFixed(2)
  );

  // order
  const handleShoppingCartBooks = () => {
    const myOrders = {
      books: bookIdAndQuantity,
      total,
      tax,
      discount,
      deliveryCharge,
    };
    dispatch(info(myOrders));
  };

  // cart data
  let cart;
  if (savedCart.length === 0) {
    cart = (
      <div className="w-full flex flex-col items-center justify-center mb-6">
        <GoBook className="text-7xl opacity-5" />
        <p className="text-center text-xl second-font">Your cart is empty</p>
      </div>
    );
  } else {
    cart = (
      <div>
        <Table>
          <TableHead>
            <th>Delete</th>
            <th className="text-center">Title</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Subtotal</th>
          </TableHead>

          <TableBody>
            {savedCart.map((data, index) => (
              <CartTableRow
                key={data._id}
                data={data}
                index={index}
                setDeleteState={setDeleteState}
              />
            ))}
          </TableBody>

          {/* subtotal and coupon */}
          <TableBody>
            <tr>
              <td></td>
              <td></td>
              <td className="flex justify-center items-center">
                <form
                  onSubmit={handleSubmit(handleVerifyCoupon)}
                  className="mt-4"
                >
                  <div className="flex">
                    <input
                      {...register("code")}
                      type="text"
                      className="input input-bordered rounded-none w-52 focus:outline-none text-center text-2xl"
                      placeholder="coupon code"
                    />

                    <button
                      className="btn btn-outline transition ease-linear duration-500 rounded-none"
                      type="submit"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  <p className="text-xs ml-1 text-red-500 mt-[6px]">
                    {errorMessage}
                  </p>
                </form>
              </td>
              <td></td>
              <td className="text-xl text-right second-font">Subtotal:</td>
              <td className="text-xl text-center">${subtotal}</td>
            </tr>
          </TableBody>
        </Table>

        <div className="mx-2">
          <div className="mt-10">
            <h4 className="mb-4 text-xl second-font">
              Choose Your Delivery Option:
            </h4>
            <div className="flex items-center mb-4 ml-5">
              <input
                onChange={handleDeliveryCharge}
                type="radio"
                id="standard-delivery"
                name="delivery-charge"
                className="radio radio-success radio-lg mr-3"
                value={5}
              />
              <label className="cursor-pointer" htmlFor="standard-delivery">
                $5 - Home Delivery - Standard{" "}
                <span className="text-2xs">7-10 working days</span>{" "}
              </label>
            </div>
            <div className="flex items-center mb-4 ml-5">
              <input
                onChange={handleDeliveryCharge}
                type="radio"
                id="express-delivery"
                name="delivery-charge"
                className="radio radio-success radio-lg mr-3"
                value={10}
              />
              <label className="cursor-pointer" htmlFor="express-delivery">
                $10 - Home Delivery - Express{" "}
                <span className="text-2xs">2-3 working days</span>{" "}
              </label>
            </div>
          </div>
          <p className="mb-4">
            <span className="second-font">Tax:</span> 5%
          </p>
          <p>
            <span className="second-font">Total:</span> ${total}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button
            onClick={clearShoppingCart}
            className="btn btn-outline btn-error mb-5 transition ease-linear duration-500"
          >
            Clear Cart <AiOutlineClear className="ml-2 text-2xl mb-1" />
          </button>
          <Link
            onClick={handleShoppingCartBooks}
            disabled={!deliveryOptionSelected}
            className="btn btn-outline transition ease-linear duration-500 mb-5"
            to="/delivery-details"
          >
            Proceed to checkout <BsBagCheck className="ml-2 text-2xl mb-1" />
          </Link>
        </div>

        <DeleteConfirmationModal
          modalName="cart-delete-confirmation-modal"
          message={
            <>
              Are You Sure You Want To Delete{" "}
              <span className="font-semibold">{deleteState?.title}</span>
            </>
          }
          deleteState={deleteState}
          handleDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <Container>
      <div
        className="min-h-screen"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <PageTitle title="Cart" />
        <h2 className="text-center text-3xl my-5 second-font">Cart</h2>

        {cart}
      </div>
    </Container>
  );
};

export default Cart;
