import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import TopRatedBook from './TopRatedBook/TopRatedBook';
import PageTitle from '../../Shared/PageTitle';
import useTopRatedBooks from '../../../Hooks/useTopRatedBooks';
import Loading from '../../Shared/Loading';

const TopRatedBooks = () => {
    const [topRatedBooksArray] = useTopRatedBooks();

    if (topRatedBooksArray.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title='Top Rated'></PageTitle>
            <h2 className='text-center text-3xl my-6'>Top Rated Books</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    topRatedBooksArray.map(data => <TopRatedBook key={data._id} data={data}></TopRatedBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default TopRatedBooks;