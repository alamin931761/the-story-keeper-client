import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { OrderContext } from "../../Context/Order";

const CheckoutForm = () => {
  const [order, setOrder] = useContext(OrderContext);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const name = order.name;
  const email = order.email;
  const total = order.total;

  const navigate = useNavigate("");
  useEffect(() => {
    if (!total && !order.delivery && !order.books) {
      navigate("/cart");
    } else {
      fetch(
        "https://the-story-keeper-server-ebon.vercel.app/create-payment-intent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ total }),
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/sign-in");
          }
          return res.json();
        })
        .then((data) => {
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [total, navigate, order.delivery, order.books]);

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

    // if (error) {
    //     setCardError(error.message);
    // }
    // else {
    //     setCardError("");
    // }
    setCardError(error?.message || "");
    setSuccessMessage("");

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });
    order.transactionId = paymentIntent.id;

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setSuccessMessage("Congrats! Your payment is completed.");
      setTransactionId(paymentIntent.id);

      // Save the order to the database
      const url = `https://the-story-keeper-server-ebon.vercel.app/order`;
      fetch(url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.insertedId) {
            toast.info("Your order has been placed");
          }
        });

      setTimeout(() => {
        localStorage.removeItem("shopping-cart");
        setOrder({});
        navigate("/dashboard/myOrders");
      }, 7000);
    }
  };

  return (
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
      {cardError && <p className="text-red-500 second-font">{cardError}</p>}
      {successMessage && (
        <div>
          <p className="text-green-500 second-font">{successMessage}</p>
          <p className="second-font">
            Your transaction Id:{" "}
            <span className="text-orange-500">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
