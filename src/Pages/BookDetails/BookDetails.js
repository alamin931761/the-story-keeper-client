import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookDetailsContext } from '../../App';
import PageTitle from '../Shared/PageTitle';
import { useForm } from 'react-hook-form';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const { image, name, name2, author, price, description, description2, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding } = bookDetails;
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`)
            .then(res => res.json())
            .then(data => setBookDetails(data));
    }, []);

    // add to cart 
    const [bookData, setBookData] = useContext(BookDetailsContext);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const check = bookData.find(book => book._id === id);
        if (check) {
            toast.error("You have already added this book to the cart")
        } else {
            const quantity = parseInt(data.quantity);
            setQuantity(quantity);
            bookDetails.quantity = quantity;
            bookDetails.subtotal = quantity * price;
            setBookData([...bookData, bookDetails]);
            toast.info(`${name} - successfully added to the cart`);
        }
        reset();
    }

    return (
        <section className='bg-white'>
            <PageTitle title="Book Details"></PageTitle>
            <div className='flex justify-center'>
                <div className='flex flex-wrap lg:flex-nowrap mt-28 mb-10 ml-10 mr-10 shadow-2xl'>
                    <div className='flex justify-center items-center'>
                        <img className='h-full sm:w-full md:full lg:w-[350px]' src={image} alt="Book" />
                    </div>

                    <div className='ml-5 pt-5 mr-5 lg:w-[550px]'>
                        <h1 className='text-3xl mt-4'>{name}</h1>
                        <h1 className='text-2xl mt-4'>{name2}</h1>
                        <h3 className='text-xl mt-4'>{author}</h3>
                        <h1 className='text-3xl mt-4'>${price}</h1>
                        <hr className='mt-4' />
                        <p className='mt-4'>{description}</p>
                        <p className='mt-4'>{description2}</p>
                        <div className='mt-4'>
                            <p className='uppercase'><small>quantity: {quantity}</small></p>
                            <p className='uppercase'><small>subtotal: {price * quantity}</small></p>
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
                            <input className='btn btn-accent' type="submit" value="Add To Cart" />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDetails;