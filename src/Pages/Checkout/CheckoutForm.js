import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePaymentIntentMutation } from "../../redux/api/paymentApi";
import Loading from "../../components/Loading";
import { clearInfo, info } from "../../redux/features/orderInfoSlice";
import UnauthorizedError from "../../components/UnauthorizedError";
import { clearCart } from "../../redux/features/shoppingCartSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createPaymentIntent, { isLoading, isError, error }] =
    useCreatePaymentIntentMutation();
  const [
    createOrder,
    {
      isLoading: createOrderLoading,
      isError: isCreateOrderError,
      error: createOrderError,
    },
  ] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  const { email, total, deliveryAddress, deliveryCharge, books } = order;

  const navigate = useNavigate("");
  useEffect(() => {
    if (
      books === undefined &&
      deliveryCharge === undefined &&
      email === undefined &&
      deliveryAddress === undefined
    ) {
      navigate("/cart");
    } else {
      const fetchClientSecret = async () => {
        const result = await createPaymentIntent({
          total,
          token: localStorage.getItem("accessToken"),
        });
        if (result?.data?.success) {
          // toast.info(result?.data?.message);
          setClientSecret(result?.data?.data?.data?.clientSecret);
        }

        if (result?.error?.data?.success === false) {
          toast.error(result?.error?.data?.message);
        }
      };
      fetchClientSecret();
    }
  }, [order, navigate, total, email]);

  // pay button
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    setSuccessMessage("");

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            // name: name,
            email: email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setSuccessMessage("Congrats! Your payment is completed.");
      const transactionId = paymentIntent.id;
      dispatch(info({ transactionId: transactionId }));

      // Save the order to the database
      const orderCreation = await createOrder({
        order: { ...order, transactionId },
        token: localStorage.getItem("accessToken"),
      });
      if (orderCreation?.data?.success) {
        toast.info(orderCreation?.data?.message);
      }

      if (orderCreation?.error?.data?.success === false) {
        toast.error(orderCreation?.error?.data?.message);
        setOrderError(orderCreation?.error?.data?.message);
      }

      setTimeout(() => {
        dispatch(clearCart());
        dispatch(clearInfo({}));
      }, 12000);
    }
  };

  if (isLoading || createOrderLoading) {
    return <Loading />;
  }

  return (
    <>
      {isError || isCreateOrderError ? (
        <UnauthorizedError error={error || createOrderError} />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button
              className="btn btn-outline btn-sm mt-5 transition ease-linear duration-500"
              type="submit"
              disabled={!stripe || !elements || !clientSecret}
            >
              Pay
            </button>
          </form>

          {/* card error */}
          {(cardError || error) && (
            <p className="text-red-500 second-font mt-2">
              Error: {cardError || error?.data?.message}
            </p>
          )}

          {/* order error */}
          {orderError && (
            <p className="text-red-500 second-font mt-2">Error: {orderError}</p>
          )}
          {successMessage && (
            <div>
              <p className="text-green-500 second-font mt-2">
                {successMessage}
              </p>
              <p className="second-font">
                Your transaction Id:{" "}
                <span className="text-orange-500">{order?.transactionId}</span>
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckoutForm;
