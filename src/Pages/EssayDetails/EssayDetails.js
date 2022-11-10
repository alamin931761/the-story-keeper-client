import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const EssayDetails = () => {
    const [essayDetails, setEssayDetails] = useState([]);
    const { image, name, name2, author, price, publisher, publication_date, weight, pages_quantity, dimensions, isbn, binding } = essayDetails;
    const { id } = useParams();
    console.log(essayDetails)
    useEffect(() => {
        fetch(`http://localhost:5000/essay/${id}`)
            .then(res => res.json())
            .then(data => setEssayDetails(data))
    }, []);
    return (
        <section className='bg-white'>
            <div className='flex justify-center'>
                <div className='flex mt-28 mb-10 ml-10 mr-10 shadow-2xl rounded-3xl'>
                    <div>
                        <img className='rounded-l-3xl' src={image} alt="Book" />
                    </div>

                    <div className='ml-5 pt-5 mr-5 w-[550px]'>
                        <h1 className='text-3xl mt-4'>{name}</h1>
                        <h1 className='text-2xl mt-4'>{name2}</h1>
                        <h3 className='text-xl mt-4'>{author}</h3>
                        <h1 className='text-3xl mt-4'>${price}</h1>
                        <hr className='mt-4' />
                        <div className='mt-4'>
                            <p className='uppercase'><small>publisher: {publisher}</small></p>
                            <p className='uppercase'><small>publication date: {publication_date}</small></p>
                            <p className='uppercase'><small>weight: {weight}</small></p>
                            <p className='uppercase'><small>pages_quantity {pages_quantity}</small></p>
                            <p className='uppercase'><small>dimensions (mm) {dimensions}</small></p>
                            <p className='uppercase'><small>isbn: {isbn}</small></p>
                            <p className='uppercase'><small>binding {binding}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EssayDetails;