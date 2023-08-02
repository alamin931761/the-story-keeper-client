import React from 'react';
import useTopRatedBooks from '../../../Hooks/useTopRatedBooks';
import Loading from '../../Shared/Loading';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import TopRatedSliceBook from './TopRatedSliceBook/TopRatedSliceBook';

const TopRatedSliceBooks = () => {
    const [topRatedBooksArray] = useTopRatedBooks();

    // loading 
    if (topRatedBooksArray.length === 0) {
        return <Loading></Loading>
    }

    const topRatedSliceBooks = topRatedBooksArray.slice(0, 3);

    return (
        <div className='mt-10' data-aos="fade-down" data-aos-duration="1000">
            <div className='flex justify-between items-center my-6'>
                <h2 className='text-3xl'>Top Rated</h2>
                <Link to='/topRatedBooks' className='text-2xl'>View all <BsArrowRight className='inline' /></Link>
            </div>

            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        topRatedSliceBooks.map(data => <TopRatedSliceBook key={data._id} data={data}></TopRatedSliceBook>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TopRatedSliceBooks;