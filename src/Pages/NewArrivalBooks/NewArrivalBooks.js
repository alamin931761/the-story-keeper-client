import React from 'react';
import useNewArrivals from '../../Hooks/useNewArrivals';
import Loading from '../Shared/Loading';
import NewArrivalBook from './NewArrivalBook/NewArrivalBook';
import PageTitle from '../Shared/PageTitle';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const NewArrivalBooks = () => {
    const [newBooks] = useNewArrivals([]);
    if (newBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div className='common-style'>
            <PageTitle title='New Arrivals'></PageTitle>
            <h2 className='text-center text-3xl my-6'>New Arrivals</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    newBooks.map(data => <NewArrivalBook key={data._id} data={data}></NewArrivalBook>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default NewArrivalBooks;