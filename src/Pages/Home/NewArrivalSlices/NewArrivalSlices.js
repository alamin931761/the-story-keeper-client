import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useNewArrivals from '../../../Hooks/useNewArrivalsAndBestSelling';
import Loading from '../../Shared/Loading';
import Card from '../../Shared/Card';

const NewArrivalSlices = () => {
    const { newArrivals } = useNewArrivals();
    const newBooksSlices = newArrivals.slice(0, 3);

    let loading;
    if (newBooksSlices.length === 0) {
        loading = <Loading></Loading>;
    }

    return (
        <div className='mt-10' data-aos="fade-up" data-aos-duration="1000">

            <div className='flex justify-between items-center my-6'>
                <h2 className='text-3xl second-font'>New Arrivals</h2>
                <Link className='text-2xl second-font underline-offset-2 hover:underline decoration-wavy hover:text-blue-500 transition ease-linear duration-500' to='/newArrivals'>View all<BsArrowRight className='inline' /></Link>
            </div>
            {loading}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    newBooksSlices.map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>
        </div>
    );
};

export default NewArrivalSlices;