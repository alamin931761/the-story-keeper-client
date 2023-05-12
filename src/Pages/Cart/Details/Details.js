import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { BookDetailsContext, OrderContext } from '../../../App';
import PageTitle from '../../Shared/PageTitle';
import Typewriter from 'typewriter-effect';
import { toast } from 'react-toastify';

const Details = () => {
    const [user] = useAuthState(auth);
    const [bookData, setBookData] = useContext(BookDetailsContext);
    const [order, setOrder] = useContext(OrderContext);
    const [address, setAddress] = useState(true);

    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const myOrder = {
            name: user?.displayName,
            email: user?.email,
            phoneNumber: data.phone,
            address: data.address,
            delivery: localStorage.getItem("delivery"),
            total: parseFloat(localStorage.getItem('total')),
            date: date,
            time: time,
            books: bookData
        };
        setOrder(myOrder)

        setAddress(data?.address);

        if (address) {
            setAddress(false);
            toast.success('Details submitted successfully')
        }
        reset();
    };

    return (
        <section className='common-style'>
            <PageTitle title="Delivery Details"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Delivery Details'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                <input className='input input-bordered w-full max-w-lg mb-2' value={user?.displayName} disabled />
                <input className='input input-bordered w-full max-w-lg mb-2' type='email' value={user?.email} disabled />

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
                    bookData[0] ? <input className='btn btn-primary mb-2' type="submit" value="Submit details" /> : <p className='text-red-400 mb-2 text-2xl'>Your cart is empty</p>
                }
            </form>

            <div className='flex justify-center mt-10 mb-20'>
                <Link disabled={address} className='btn btn-success' to='/checkout'>Proceed to checkout</Link>
            </div>
        </section>
    );
};

export default Details;