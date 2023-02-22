import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import NewArrivalSlices from './NewArrivalSlices/NewArrivalSlices';
import { Link } from 'react-router-dom';
import useNewArrivals from '../../../Hooks/useNewArrivals';

const NewArrivals = () => {
    const [newBooks] = useNewArrivals([]);
    const newBooksSlices = newBooks.slice(4, 7);
    return (
        <section className='bg-white border border-red-500 my-5'>
            <div className='flex justify-between'>
                <h2 className='text-3xl ml-5'>New Arrivals</h2>
                <Link className='mr-5' to='/NewArrivalBooks'>View all <BsArrowRight className='inline' /></Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    newBooksSlices.map(data => <NewArrivalSlices key={data._id} data={data}></NewArrivalSlices>)
                }
            </div>
        </section>
    );
};

export default NewArrivals;