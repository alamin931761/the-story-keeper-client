import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import NonFictionBook from './NonFictionBook/NonFictionBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const NonFictionBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const nonFiction = allBooks.filter(book => book.category === "non-fiction");
    if (nonFiction.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title='Non-Fiction'></PageTitle>
            <h2 className='text-center text-3xl my-6'>Non-Fiction</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    nonFiction.map(data => <NonFictionBook key={data._id} data={data}></NonFictionBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default NonFictionBooks;