import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BookDetailsContext } from '../../App';
import PageTitle from '../Shared/PageTitle';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { image, name, name2, author, price, description, description2, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding } = bookDetails;
    const subtotal = price * quantity;
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/book/${id}`)
            .then(res => res.json())
            .then(data => setBookDetails(data));
    }, []);

    // add to cart 
    const [bookData, setBookData] = useContext(BookDetailsContext);

    const handleAddToCart = (data) => {
        data.subtotal = subtotal;
        data.quantity = quantity;
        const check = bookData.find(book => book._id === data._id);
        if (check) {
            toast.error("You have already added this book to the cart")
        } else {
            setBookData([...bookData, data]);
            toast.info(`${name} - successfully added to the cart`);
        }
    };

    // quantity 
    const increase = () => {
        setQuantity(quantity + 1);
    };
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.error("Sorry! Less Number of Quantity");
        }
    };

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
                            <p className='uppercase'><small>subtotal: {subtotal}</small></p>
                            <p className='uppercase'><small>publisher: {publisher}</small></p>
                            <p className='uppercase'><small>publication date: {publication_date}</small></p>
                            <p className='uppercase'><small>weight: {weight}</small></p>
                            <p className='uppercase'><small>{pages_quantity ? 'pages quantity' : ''} {pages_quantity}</small></p>
                            <p className='uppercase'><small>{dimensions ? 'dimensions (mm): ' : ''}{dimensions}</small></p>
                            <p className='uppercase'><small>{isbn ? 'isbn:' : ''} {isbn}</small></p>
                            <p className='uppercase'><small>{binding ? "binding:" : ''} {binding}</small></p>
                        </div>
                        <div className='mt-2 mb-2 flex'>
                            <button onClick={() => decrease()} className='btn btn-outline rounded-none h-[10px]'>-</button>
                            <p className='inline-block h-[48px] w-[100px] text-center text-5xl border border-red-400'>{quantity}</p>
                            <button onClick={() => increase()} className='btn btn-outline rounded-none h-[10px] mr-8'>+</button>
                            <button onClick={() => handleAddToCart(bookDetails)} className="btn btn-success">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default BookDetails;