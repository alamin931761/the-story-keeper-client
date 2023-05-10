import React from 'react';
import useBestSellingBooks from '../../Hooks/useBestSellingBooks';
import Loading from '../Shared/Loading';
import BestSellingBook from './BestSellingBook/BestSellingBook';
import PageTitle from '../Shared/PageTitle';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const BestSellingBooks = () => {
    const [bestsellingBooks] = useBestSellingBooks([]);
    if (bestsellingBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title='Bestselling Books'></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Bestselling Books'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    bestsellingBooks.map(data => <BestSellingBook key={data._id} data={data}></BestSellingBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-primary mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default BestSellingBooks;