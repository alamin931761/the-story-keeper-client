import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import MysteryAndCrimeBook from './MysteryAndCrimeBook/MysteryAndCrimeBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const MysteryAndCrimeBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const mysteryAndCrimeBooks = allBooks.filter(book => book.category === "mystery-and-crime");
    if (mysteryAndCrimeBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title="Mystery & Crime"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Mystery & Crime</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    mysteryAndCrimeBooks.map(data => <MysteryAndCrimeBook key={data._id} data={data}></MysteryAndCrimeBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default MysteryAndCrimeBooks;