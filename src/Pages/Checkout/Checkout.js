import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51L4PWfLjrmUqnITL4TDtVJQQb9fne5taAj6AYMgv1WRYo6WqERdQ2bxlLgMjNTV3HQQq2fAcBpDPi4GbYkLLlQCa00Tltuz0Tl');

    return (
        <section className='pt-32'>
            <h1 className='text-center text-3xl mb-5'>Welcome to checkout page</h1>

            <div className="card w-[500px] bg-white shadow-xl p-6">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </section>
    );
};

export default Checkout;