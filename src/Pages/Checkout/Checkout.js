import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PageTitle from "../../components/PageTitle";
import Container from "../../components/Container";

const Checkout = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_publishable_key);

  return (
    <Container>
      <div
        className="mb-5 min-h-screen"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <PageTitle title="Checkout" />
        <h2 className="text-center text-3xl my-5 second-font">
          Welcome to checkout page
        </h2>

        <div className="flex justify-center items-center">
          <div className="card w-[500px] shadow-xl p-10">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
