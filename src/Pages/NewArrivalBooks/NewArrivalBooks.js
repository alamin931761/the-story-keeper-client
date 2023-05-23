import React from 'react';
import useNewArrivals from '../../Hooks/useNewArrivals';
import Loading from '../Shared/Loading';
import NewArrivalBook from './NewArrivalBook/NewArrivalBook';
import PageTitle from '../Shared/PageTitle';
import Typewriter from 'typewriter-effect';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const NewArrivalBooks = () => {
    const [newBooks] = useNewArrivals([]);
    if (newBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title='New Arrivals'></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['New Arrivals'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {
                    newBooks.map(data => <NewArrivalBook key={data._id} data={data}></NewArrivalBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-outline mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section>
    );
};

export default NewArrivalBooks;