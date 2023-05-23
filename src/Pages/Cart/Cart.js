import React, { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { BookDetailsContext } from '../../App';
import Table from './Table/Table';
import { toast } from 'react-toastify';
import Typewriter from 'typewriter-effect';
import PageTitle from '../Shared/PageTitle';
import { BsBagCheck } from 'react-icons/bs';

const Cart = () => {
    const [bookData, setBookData] = useContext(BookDetailsContext);
    const [coupon, setCoupon] = useState([]);
    console.log(coupon);
    const [bookSubtotal, setBookSubtotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [chooseDeliveryOption, setChooseDeliveryOption] = useState(true);

    // delete book 
    const deleteBook = (id) => {
        const remainingBooks = bookData.filter(book => book._id !== id);
        setBookData(remainingBooks);
    };

    // subtotal  
    const subTotals = bookData.map(book => book.subtotal);
    let subTotal = 0;
    for (const price of subTotals) {
        subTotal = subTotal + price
    };

    useEffect(() => {
        setBookSubtotal(subTotal)
    }, [subTotal])

    // coupon codes 
    useEffect(() => {
        fetch("https://the-story-keeper-server-ten.vercel.app/couponCodes", {
            method: 'GET',
            // headers: {
            //     authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            // },
        })
            .then(res => res.json())
            .then(data => setCoupon(data));
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const check = coupon.find(code => data.couponCode === code.code);
        if (check?.code) {
            toast.success("Your coupon has been applied successfully");
            const discount = subTotal - (subTotal * 0.2);
            setBookSubtotal(discount);
            reset();
        } else {
            toast.error("Your coupon code is incorrect");
            reset();
        }
    }

    // DeliveryCharge 
    const handleDeliveryCharge = (event) => {
        const cost = parseFloat(event.target.value)
        setDeliveryCharge(cost);
        if (cost === 5) {
            localStorage.setItem("delivery", "Standard");
            setChooseDeliveryOption(false);
        }
        if (cost === 10) {
            localStorage.setItem("delivery", "Express");
            setChooseDeliveryOption(false);
        }
    };

    // total 
    const tax = bookSubtotal * 0.05;
    let total = (bookSubtotal + tax + deliveryCharge).toFixed(2);
    localStorage.setItem('total', total);

    // cart data 
    let cart;
    if (bookData.length === 0) {
        cart = <h1 className='text-center text-3xl mt-32'>Your cart is empty</h1>
    } else {
        cart = <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookData.map(data => <Table key={data._id} data={data} deleteBook={deleteBook}></Table>)
                    }
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td className='flex justify-center items-center'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                                <div className="form-control w-full max-w-xs">
                                    <input {...register("couponCode", {
                                        required: true,
                                        minLength: {
                                            value: 5,
                                            message: "Coupon code must be 5 digits or more"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Coupon code must be 10 digits or less"
                                        }
                                    })} type="text" placeholder='coupon code' className="input input-bordered w-full max-w-xs rounded-none" />
                                    <label className="label">
                                        {errors.couponCode?.type === 'minLength' && <span className="label-text-alt text-red-400">{errors.couponCode.message}</span>}
                                        {errors.couponCode?.type === 'maxLength' && <span className="label-text-alt text-red-400">{errors.couponCode.message}</span>}
                                    </label>
                                </div>
                                <input className="btn btn-outline rounded-none" type="submit" value='Apply coupon' />
                            </form>
                        </td>
                        <td></td>
                        <td className='text-xl text-right'>Subtotal:</td>
                        <td className='text-xl text-center'>${bookSubtotal}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <div className='mt-10'>
                    <h4 className='mb-4 text-xl'>Choose Your Delivery Option:</h4>
                    <div className='flex items-center mb-4 ml-5'>
                        <input onChange={handleDeliveryCharge} type="radio" id="standard-delivery" name="delivery-charge" className="radio radio-success radio-lg mr-3" value={5} />
                        <label htmlFor="standard-delivery">$5 - Home Delivery - Standard <span className='text-2xs'>7-10 working days</span> </label>
                    </div>
                    <div className='flex items-center mb-4 ml-5'>
                        <input onChange={handleDeliveryCharge} type="radio" id='express-delivery' name="delivery-charge" className="radio radio-success radio-lg mr-3" value={10} />
                        <label htmlFor="express-delivery">$10 - Home Delivery - Express <span className='text-2xs'>2-3 working days</span> </label>
                    </div>
                </div>
                <p className='mb-4'>Tax: 5%</p>
                <p>Total: ${total}</p>
            </div>

            <div className='flex justify-center mt-10'>
                <Link disabled={chooseDeliveryOption} className='btn btn-outline' to='/details'>Proceed to checkout <BsBagCheck className='ml-2 text-2xl mb-1' /></Link>
            </div>
        </div >
    };

    return (
        <section className='common-style'>
            <PageTitle title="Cart"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Cart Page'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            {cart}
        </section >
    );
};

export default Cart;