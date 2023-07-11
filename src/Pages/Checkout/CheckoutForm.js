import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import { BookDetailsContext, OrderContext } from '../../App';
import Loading from '../Shared/Loading';

const CheckoutForm = () => {
    const [user] = useAuthState(auth);
    const [order, setOrder] = useContext(OrderContext);
    const [bookData, setBookData] = useContext(BookDetailsContext);
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const name = user?.displayName;
    const email = user?.email;
    const price = localStorage.getItem('total');

    useEffect(() => {
        fetch('https://the-story-keeper-server-ten.vercel.app/create-payment-intent', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })
    }, [price]);

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
            type: 'card',
            card
        });

        // if (error) {
        //     setCardError(error.message);
        // }
        // else {
        //     setCardError("");
        // }
        setCardError(error?.message || "");
        setSuccessMessage('');

        // confirm card payment 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        order.transactionId = paymentIntent.id;

        if (intentError) {
            setCardError(intentError?.message);
        } else {
            setCardError('');
            setSuccessMessage('Congrats! Your payment is completed.');
            setTransactionId(paymentIntent.id);


            // Save the order to the database 
            const url = `https://the-story-keeper-server-ten.vercel.app/order`;
            fetch(url, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(result => {
                    if (result.insertedId) {
                        toast.info("Your order has been placed");
                    }
                });
            setBookData([]);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className='btn btn-outline btn-sm mt-5' type="submit" disabled={!stripe || !elements || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                successMessage && <div>
                    <p className='text-green-500'>{successMessage}</p>
                    <p>Your transaction Id: <span className='text-orange-500'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;