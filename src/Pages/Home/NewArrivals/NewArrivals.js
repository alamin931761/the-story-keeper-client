import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import NewArrivalSlices from './NewArrivalSlices/NewArrivalSlices';
import { Link } from 'react-router-dom';
import useNewArrivals from '../../../Hooks/useNewArrivals';
import Loading from '../../Shared/Loading';

const NewArrivals = () => {
    const [newBooks] = useNewArrivals([]);
    const newBooksSlices = newBooks.slice(4, 7);
    if (newBooksSlices.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='mt-10'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='ml-5 text-[4vw]'>New Arrivals</h2>
                <Link className='mr-5 text-[2vw]' to='/NewArrivalBooks'>View all<BsArrowRight className='inline' /></Link>
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