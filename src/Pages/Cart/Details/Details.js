import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { OrderContext } from '../../../App';
import PageTitle from '../../Shared/PageTitle';
import { toast } from 'react-toastify';
import { BsBagCheck } from 'react-icons/bs';

const Details = () => {
    const [user] = useAuthState(auth);
    const [order, setOrder] = useContext(OrderContext);
    const [checkoutButton, setCheckoutButton] = useState(true);

    const navigate = useNavigate('');
    if (!order.total && !order.delivery && !order.books) {
        navigate('/cart');
    }

    // date and time 
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
            date: date,
            time: time,
            books: order.books,
            delivery: order.delivery,
            total: order.total
        };
        setOrder(myOrder);
        toast.success('Details submitted successfully')
        reset();
    };

    // proceed to checkout button 
    useEffect(() => {
        if (Object.keys(order).length === 9) {
            setCheckoutButton(false);
        }
    }, [order])


    return (
        <div className='common-style'>
            <PageTitle title="Delivery Details"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Delivery Details</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                <input className='input input-bordered w-full max-w-lg mb-4' value={user?.displayName} disabled />
                <input className='input input-bordered w-full max-w-lg mb-4' type='email' value={user?.email} disabled />

                {/* phone number */}
                <div className="form-control w-full max-w-lg">
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
                <div className="form-control w-full max-w-lg">
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
                    <input className='btn btn-outline mt-0 mb-6' type="submit" value="Submit details" />
                }
            </form>

            <div className='flex justify-center mb-6'>
                <Link disabled={checkoutButton} className='btn btn-outline' to='/checkout'>Proceed to checkout<BsBagCheck className='ml-2 text-2xl mb-1' /></Link>
            </div>
        </div>
    );
};

export default Details;