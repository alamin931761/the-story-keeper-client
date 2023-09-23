import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import PageTitle from '../../Shared/PageTitle';

const Checkout = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_publishable_key);

    return (
        <div className='common-style mb-6' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title="Checkout"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Welcome to checkout page</h2>

            <div className='flex justify-center items-center'>
                <div className="card w-[500px] shadow-xl p-10">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Checkout;