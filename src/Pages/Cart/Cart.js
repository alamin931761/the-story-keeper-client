import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { BookDetailsContext } from '../../App';
import Table from './Table/Table';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
    const [bookData, setBookData] = useContext(BookDetailsContext);
    const [coupon, setCoupon] = useState([]);
    const [bookSubtotal, setBookSubtotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);

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
        fetch("http://localhost:5000/couponCodes")
            .then(res => res.json())
            .then(data => setCoupon(data));
    }, []);

    const { register, handleSubmit, reset } = useForm();
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
        setDeliveryCharge(parseFloat(event.target.value));
    };

    // total 
    const tax = bookSubtotal * 0.05;
    let total = (bookSubtotal + tax + deliveryCharge).toFixed(2);

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
                    <td></td>
                    <td className='border border-red-400 flex justify-center items-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                            <div className="form-control w-full max-w-xs">
                                <input {...register("couponCode", { required: true, minLength: 5, maxLength: 10 })} type="text" placeholder='coupon code' className="input input-bordered w-full max-w-xs rounded-none" />
                                <label className="label">
                                    <span className="label-text-alt">Error Message</span>
                                </label>
                            </div>
                            <input className="btn btn-primary rounded-none" type="submit" value='Apply coupon' />
                        </form>
                    </td>
                    <td></td>
                    <td className='border border-gray-700 text-xl text-right'>Subtotal:</td>
                    <td className='border border-green-400 text-xl text-center'>${bookSubtotal}</td>
                </tbody>
            </table>

            <div>
                <h1 className='text-center text-3xl'>Cart Totals</h1>

                <div>
                    <h6 className='mb-4'>Choose Your Delivery Option:</h6>
                    <div className='flex items-center mb-4 ml-5'>
                        <input onChange={handleDeliveryCharge} type="radio" id='store' name="delivery-charge" className="radio radio-success radio-lg mr-3" value={0} />
                        <label htmlFor="store">$0 - Collect in store (Gazipur, Bangladesh) <span className='text-2xs'>3-5 working days</span> </label>
                    </div>
                    <div className='flex items-center mb-4 ml-5'>
                        <input onChange={handleDeliveryCharge} type="radio" id='express-delivery' name="delivery-charge" className="radio radio-success radio-lg mr-3" value={15} />
                        <label htmlFor="express-delivery">$15 - Home Delivery - Express <span className='text-2xs'>4-5 working days</span> </label>
                    </div>
                    <div className='flex items-center mb-4 ml-5'>
                        <input onChange={handleDeliveryCharge} type="radio" id="standard-delivery" name="delivery-charge" className="radio radio-success radio-lg mr-3" value={10} />
                        <label htmlFor="standard-delivery">$10 - Home Delivery - Standard <span className='text-2xs'>2-3 weeks</span> </label>
                    </div>
                </div>
                <p className='mb-4'>Tax: 5%</p>

                <p>Total: ${total}</p>
            </div>

            <div className='flex justify-center mt-10'>
                <Link className='btn btn-success' to='/checkout'>Proceed to checkout</Link>
            </div>
        </div>
    };

    return (
        <section className='pt-32 pb-32 border border-3 border-red-500'>
            <h1 className='text-5xl text-center'>Cart Page</h1>
            {cart}

            <ToastContainer></ToastContainer>
        </section >
    );
};

export default Cart;