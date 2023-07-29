import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Table from './Table/Table';
import { toast } from 'react-toastify';
import PageTitle from '../Shared/PageTitle';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineClear } from 'react-icons/ai';
import { GoBook } from 'react-icons/go';
import useShoppingCart from '../../Hooks/useShoppingCart';
import { deleteShoppingCart, removeFromStorage } from '../../utilities/saveShoppingCartData';
import Loading from '../Shared/Loading';
import { OrderContext } from '../../App';

const Cart = () => {
    const { savedCart } = useShoppingCart();
    const [coupon, setCoupon] = useState([]);
    const [bookSubtotal, setBookSubtotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [delivery, setDelivery] = useState("");
    const [chooseDeliveryOption, setChooseDeliveryOption] = useState(true);
    const [order, setOrder] = useContext(OrderContext);

    // delete book 
    const deleteBook = (id) => {
        removeFromStorage(id);
    };

    // subtotal calculation
    const subtotals = savedCart.map(book => book.subtotal);
    let subtotal = 0;
    for (const price of subtotals) {
        subtotal = subtotal + price;
    };

    useEffect(() => {
        setBookSubtotal(subtotal);
    }, [subtotal])

    // coupon codes 
    useEffect(() => {
        fetch("http://localhost:5000/couponCodes")
            .then(res => res.json())
            .then(data => setCoupon(data));
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const check = coupon.find(code => data.couponCode === code.code);
        if (check) {
            const discount = subtotal - (subtotal * 0.2);
            setBookSubtotal(discount);
            toast.success("Your coupon has been applied successfully");
            reset();
        } else {
            toast.error("Your coupon code is incorrect");
            reset();
        }
    }

    // DeliveryCharge 
    const handleDeliveryCharge = (event) => {
        const cost = parseInt(event.target.value);
        setDeliveryCharge(cost);
        if (cost === 5) {
            setDelivery("Standard");
            setChooseDeliveryOption(false);
        }
        if (cost === 10) {
            setDelivery("Express");
            setChooseDeliveryOption(false);
        }
    };

    // total 
    const tax = bookSubtotal * 0.05;
    let total = parseFloat((bookSubtotal + tax + deliveryCharge).toFixed(2));

    // clear cart 
    const clearCart = () => {
        deleteShoppingCart();
    }

    // loading 
    const storageData = localStorage.getItem('shopping-cart');
    if (storageData) {
        const data = JSON.parse(storageData);
        const dataLength = Object.keys(data).length;
        if (dataLength && savedCart.length === 0) {
            return <Loading></Loading>;
        }
    }

    // order 
    const handleOrderedBooks = () => {
        const myOrder = {
            books: savedCart,
            delivery: delivery,
            total: total
        }
        setOrder(myOrder);
    }

    // cart data 
    let cart;
    if (savedCart.length === 0) {
        cart = <div className='w-full flex flex-col items-center justify-center mb-6'>
            <GoBook className='text-7xl opacity-5' />
            <p className='text-center text-xl'>Your cart is empty</p>
        </div>
    }
    else {
        cart = <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Delete</th>
                        <th className='text-center'>Title</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        savedCart.map((data, index) => <Table key={data._id} data={data} index={index} deleteBook={deleteBook}></Table>)
                    }
                </tbody>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className='flex justify-center items-center'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                                <div className="form-control w-full">
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
                                    })} type="text" placeholder='coupon code' className="input input-bordered w-[200px] rounded-none" />
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

            <div className='flex flex-col justify-center items-center my-6'>
                <button onClick={clearCart} className='btn btn-outline btn-error mb-6'>Clear Cart <AiOutlineClear className='ml-2 text-2xl mb-1' /></button>
                <Link onClick={handleOrderedBooks} disabled={chooseDeliveryOption} className='btn btn-outline' to='/details'>Proceed to checkout <BsBagCheck className='ml-2 text-2xl mb-1' /></Link>
            </div>
        </div >
    };

    return (
        <div className='common-style'>
            <PageTitle title="Cart"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Cart</h2>

            {cart}
        </div >
    );
};

export default Cart;