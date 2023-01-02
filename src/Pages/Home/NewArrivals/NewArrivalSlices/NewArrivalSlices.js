import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BookDetailsContext } from '../../../../App';


const NewArrivalSlices = ({ data }) => {
    const { name, author, price, image, _id } = data;
    const navigate = useNavigate();
    const navigateToDetails = (id) => {
        navigate(`/bookDetails/${id}`);
    };

    const [bookData, setBookData] = useContext(BookDetailsContext);
    const handleAddToCart = (data) => {
        setBookData([...bookData, data]);
        toast.info(`${name} - successfully added to the cart`);
        toast.info("If you want to increase the quantity or remove the book from the cart, please visit the Cart🛒page.");
    };

    return (
        <section className='flex justify-center'>
            <div className="card w-[450px] bg-white shadow-2xl">
                <figure><img className='h-[450px] w-[450px]' src={image} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className='text-xl'>{author}</p>
                    <h2 className='text-2xl font-bold'>${price}</h2>
                    <div className="card-actions justify-end">
                        <button onClick={() => navigateToDetails(_id)} className="btn btn-primary">Details</button>
                        <button onClick={() => handleAddToCart(data)} className="btn btn-success">Add To Cart</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default NewArrivalSlices;