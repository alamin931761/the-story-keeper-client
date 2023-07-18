import React from 'react';
import useBestSellingBooks from '../../Hooks/useBestSellingBooks';
import Loading from '../Shared/Loading';
import BestSellingBook from './BestSellingBook/BestSellingBook';
import PageTitle from '../Shared/PageTitle';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const BestSellingBooks = () => {
    const [bestsellingBooks] = useBestSellingBooks([]);
    if (bestsellingBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title='Bestselling Books'></PageTitle>
            <h2 className='text-center text-3xl my-6'>Bestselling Books</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    bestsellingBooks.map(data => <BestSellingBook key={data._id} data={data}></BestSellingBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default BestSellingBooks;