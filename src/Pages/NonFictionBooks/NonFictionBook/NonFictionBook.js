import React from 'react';
import { useNavigate } from 'react-router-dom';

const NonFictionBook = ({ data }) => {
    const { name, author, price, image, _id } = data;

    const navigate = useNavigate();
    const navigateToDetails = (id) => {
        navigate(`/bookDetails/${id}`);
    };

    return (
        <div className='flex justify-center'>
            <div className="card w-[450px] bg-[#DFF6FF] shadow-xl">
                <figure><img className='h-[450px] w-[450px]' src={image} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className='text-lg'>{author}</p>
                    <h2 className='text-xl font-bold'>${price}</h2>
                    <div className="card-actions justify-end">
                        <button onClick={() => navigateToDetails(_id)} className="btn btn-outline">Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NonFictionBook;