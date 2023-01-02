import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewArrivalBook = ({ data }) => {
    const { name, author, price, image, _id } = data;
    const navigate = useNavigate();
    const navigateToDetails = (id) => {
        navigate(`/bookDetails/${id}`);
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalBook;