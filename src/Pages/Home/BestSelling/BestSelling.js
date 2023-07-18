import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import BestSellingSlices from './BestSellingSlices/BestSellingSlices';
import useBestSellingBooks from '../../../Hooks/useBestSellingBooks';
import Loading from '../../Shared/Loading';

const BestSelling = () => {
    const [bestsellingBooks] = useBestSellingBooks([]);
    const bestSellingSlices = bestsellingBooks.slice(0, 3);

    if (bestSellingSlices.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='mt-10'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-3xl'>Bestselling Books</h2>
                <Link to='/bestSellingBooks' className='text-2xl'>View all <BsArrowRight className='inline' /></Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    bestSellingSlices.map(data => <BestSellingSlices key={data._id} data={data}></BestSellingSlices>)
                }
            </div>
        </div>
    );
};

export default BestSelling;