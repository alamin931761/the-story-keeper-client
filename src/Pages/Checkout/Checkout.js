import React from 'react';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BookDetailsContext } from '../../App';
import auth from '../../firebase.init';

const Checkout = () => {
    const [user] = useAuthState(auth);
    const [bookData, setBookData] = useContext(BookDetailsContext);
    console.log(bookData)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const order = {
            name: user?.displayName,
            email: user?.email,
            phoneNumber: data.phone,
            address: data.address,
            books: bookData
        };

        const url = `http://localhost:5000/order`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    toast.info("Your order has been placed");
                    reset();
                }
            })
    };

    return (
        <section className='pt-32'>
            <h1 className='text-center text-3xl mb-5'>Welcome to checkout page</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                <input className='input input-bordered w-full max-w-lg mb-2' value={user.displayName} disabled />
                <input className='input input-bordered w-full max-w-lg mb-2' type='email' value={user.email} disabled />

                {/* phone number */}
                <div className="form-control w-full max-w-lg mb-2">
                    <input className='input input-bordered w-full max-w-lg' placeholder='Phone Number' {...register("phone", {
                        required: {
                            value: true,
                            message: "Phone number field is required"
                        },
                        minLength: {
                            value: 11,
                            message: "Phone number should be at least 11 digits long"
                        }
                    })} />
                    <label className="label">
                        {errors.phone?.type === 'required' && <span className="label-text-alt text-red-400">{errors.phone.message}</span>}
                        {errors.phone?.type === 'minLength' && <span className="label-text-alt text-red-400">{errors.phone.message}</span>}
                    </label>
                </div>

                {/* address */}
                <div className="form-control w-full max-w-lg mb-2">
                    <input className='input input-bordered w-full max-w-lg' placeholder='Delivery Address' {...register("address", {
                        required: {
                            value: true,
                            message: "Delivery Address field is required"
                        }
                    })} />
                    <label className="label">
                        {errors.address?.type === 'required' && <span className="label-text-alt text-red-400">{errors.address.message}</span>}
                    </label>
                </div>
                {
                    bookData[0] ? <input className='btn btn-primary mb-2' type="submit" value="Proceed to checkout" /> : <p className='text-red-400 mb-2 text-2xl'>Your cart is empty</p>

                }
            </form>
        </section>
    );
};

export default Checkout;