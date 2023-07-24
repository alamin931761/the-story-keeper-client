import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../Shared/PageTitle';
import { useForm } from 'react-hook-form';
import { BsCartPlus } from "react-icons/bs";
import Loading from '../Shared/Loading';
import { addToStorage } from '../../utilities/saveShoppingCartData';
import useShoppingCart from '../../Hooks/useShoppingCart';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState({});
    const { _id, image, name, name2, author, price, description, description2, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding } = bookDetails;
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`)
            .then(res => res.json())
            .then(data => setBookDetails(data));
    }, []);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        // Add book data to local storage
        addToStorage(_id, parseInt(data.quantity));
        toast.info(`${name} - successfully added to the cart`);
        reset();
    };

    // set quantity and subtotal values 
    const { savedCart } = useShoppingCart();
    let quantity = 0;
    let subtotal = 0;
    const findBook = savedCart.find(book => book._id === _id);
    if (findBook) {
        quantity = findBook.quantity;
        subtotal = findBook.subtotal;
    }

    if (!bookDetails.image) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style mb-6'>
            <PageTitle title="Book Details"></PageTitle>
            <h2 className='text-center text-3xl my-6'>{name} - details</h2>

            <div className='flex justify-center'>
                <div className='flex flex-wrap lg:flex-nowrap shadow-2xl bg-[#DFF6FF] justify-center'>
                    <div>
                        <img className='h-full sm:w-full md:w-full lg:w-[350px]' src={image} alt="Book" />
                    </div>

                    <div className='ml-5 pt-5 mr-5 lg:w-[550px]'>
                        <h1 className='text-2xl mt-4'>{name}</h1>
                        <h1 className='text-xl mt-4'>{name2}</h1>
                        <h3 className='text-lg mt-4'>{author}</h3>
                        <h1 className='text-2xl mt-4'>${price}</h1>
                        <hr className='mt-4' />
                        <p className='mt-4'>{description}</p>
                        <p className='mt-4'>{description2}</p>
                        <div className='mt-4'>
                            <p className='uppercase'><small>quantity: {quantity}</small></p>
                            <p className='uppercase'><small>subtotal: {subtotal}</small></p>
                            <p className='uppercase'><small>publisher: {publisher}</small></p>
                            <p className='uppercase'><small>publication date: {publication_date}</small></p>
                            <p className='uppercase'><small>weight: {weight}</small></p>
                            <p className='uppercase'><small>{pages_quantity ? 'pages quantity' : ''} {pages_quantity}</small></p>
                            <p className='uppercase'><small>{dimensions ? 'dimensions (mm): ' : ''}{dimensions}</small></p>
                            <p className='uppercase'><small>{isbn ? 'isbn:' : ''} {isbn}</small></p>
                            <p className='uppercase'><small>{binding ? "binding:" : ''} {binding}</small></p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between my-2'>
                            <div className="form-control w-full max-w-[200px] mb-2">
                                <input type='number' className='input input-bordered w-full max-w-lg' placeholder='Quantity' {...register("quantity", {
                                    required: {
                                        value: true,
                                        message: "Quantity field is required"
                                    },
                                    min: {
                                        value: 1,
                                        message: "Minimum quantity must be 1"
                                    },
                                    max: {
                                        value: 1000,
                                        message: "Quantity must be less than 1001"
                                    }
                                })} />
                                <label className="label">
                                    {errors.quantity?.type === 'required' && <span className="label-text-alt text-red-400">{errors.quantity.message}</span>}
                                    {errors.quantity?.type === 'min' && <span className="label-text-alt text-red-400">{errors.quantity.message}</span>}
                                    {errors.quantity?.type === 'max' && <span className="label-text-alt text-red-400">{errors.quantity.message}</span>}
                                </label>
                            </div>
                            <button className='btn btn-outline' type="submit"><BsCartPlus className="text-2xl mr-2" />Add To Cart</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;