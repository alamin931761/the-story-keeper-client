import React from 'react';
import useTopRatedBooks from '../../../Hooks/useTopRatedBooks';
import Loading from '../../Shared/Loading';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import Card from '../../Shared/Card';

const TopRatedSlices = () => {
    const [topRatedBooksArray] = useTopRatedBooks();

    // loading 
    let loading;
    if (topRatedBooksArray.length === 0) {
        loading = <Loading></Loading>;
    }

    const topRatedSliceBooks = topRatedBooksArray.slice(0, 3);

    return (
        <div className='mt-10' data-aos="fade-down" data-aos-duration="1000">
            <div className='flex justify-between items-center my-6 second-font'>
                <h2 className='text-3xl '>Top Rated</h2>
                <Link to='/topRated' className='text-2xl underline-offset-2 hover:underline decoration-wavy hover:text-blue-500 transition ease-linear duration-500'>View all <BsArrowRight className='inline' /></Link>
            </div>

            {loading}
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        topRatedSliceBooks.map(data => <Card key={data._id} data={data}></Card>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TopRatedSlices;