import React from 'react';
import PoetryBook from './PoetryBook/PoetryBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import useAllBooks from '../../../Hooks/useAllBooks';
import Loading from '../../Shared/Loading';
import PageTitle from '../../Shared/PageTitle';

const PoetryBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const poetryBooks = allBooks.filter(book => book.category === "poetry");
    if (poetryBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="Poetry"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Poetry</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    poetryBooks.map(data => <PoetryBook key={data._id} data={data}></PoetryBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default PoetryBooks;