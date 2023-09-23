import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import Reviews from './Reviews/Reviews';
import PageTitle from '../../Shared/PageTitle';
import Loading from '../../Shared/Loading';
import useShoppingCart from '../../../Hooks/useShoppingCart';
import { addToStorage } from '../../../utilities/saveShoppingCartData';
import RandomBooks from './RandomBooks/RandomBooks';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState({});
    const navigate = useNavigate('');
    const { _id, image, title, subtitle, author, price, description, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding, reviews } = bookDetails;
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`)
            .then(res => res.json())
            .then(data => setBookDetails(data));
    }, [id, bookDetails]);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        // Add book data to local storage
        addToStorage(_id, parseInt(data.quantity));
        toast.info(`${title} - successfully added to the cart`);
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

    // add review 
    const handleAddReview = () => {
        navigate(`/addReview/${_id}`);
    }

    let totalReview = 0;
    let totalRating = 0;
    let averageRating = 0;
    let reviewContainer;
    if (reviews) {
        totalReview = reviews.length;
        const ratings = reviews.map(data => data.rating);
        for (const rating of ratings) {
            totalRating = totalRating + rating;
        }

        averageRating = (totalRating / totalReview).toFixed(1);

        reviewContainer = <div className='flex flex-wrap justify-around gap-y-7 mt-6'>
            {
                reviews.map(data => <Reviews data={data} key={data.review
                }></Reviews>)
            }
        </div>

    } else {
        reviewContainer = <div className='mt-6 flex flex-col items-center justify-center second-font'>
            <MdOutlineRateReview className='text-7xl opacity-5' />
            <p>This book has no reviews yet. Be the first one to write a review.</p>
        </div>
    }

    return (
        <div className='common-style mb-6' data-aos="fade-right" data-aos-duration="1000">
            <PageTitle title="Book Details"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>{title} - details</h2>

            <div className='flex justify-center'>
                <div className='flex flex-wrap lg:flex-nowrap shadow-2xl bg-[#DFF6FF] justify-center'>
                    <div>
                        <img className='h-full sm:w-full md:w-full lg:w-[350px]' src={image} alt={title} />
                    </div>

                    <div className='ml-5 pt-5 mr-5 lg:w-[550px]'>
                        <h1 className='text-2xl mt-4 second-font'>{title}</h1>
                        <h1 className='text-xl mt-4 second-font'>{subtitle}</h1>
                        <h3 className='text-lg mt-4 second-font'>{author}</h3>
                        <h1 className='text-2xl mt-4 second-font'>${price}</h1>
                        <hr className='mt-4' />
                        <p className='mt-4'>{description}</p>
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
                            <button className='btn btn-outline transition ease-linear duration-500' type="submit"><BsCartPlus className="text-2xl mr-2" />Add To Cart</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='mt-12 mb-6'>
                <h2 className='text-center text-3xl second-font'>Reviews({totalReview})</h2>
                <div className='flex items-center justify-between'>
                    <p className='second-font'>Get specific details about this book from customers who own it.</p>
                    <button onClick={handleAddReview} className='btn btn-outline transition ease-linear duration-500'>Write a Review</button>
                </div>
                <p className='second-font'><span className='font-semibold'>Ratings:</span> {averageRating} out of 5</p>

                <hr className='mt-6' />

                {/* reviews */}
                {reviewContainer}
            </div>

            <div className="divider"></div>
            {/* random books */}
            <div className='mt-12'>
                <RandomBooks id={_id} />
            </div>
        </div>
    );
};

export default BookDetails;