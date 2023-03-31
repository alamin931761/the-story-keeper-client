import React from 'react';
import useNewArrivals from '../../Hooks/useNewArrivals';
import Loading from '../Shared/Loading';
import NewArrivalBook from './NewArrivalBook/NewArrivalBook';

const NewArrivalBooks = () => {
    const [newBooks] = useNewArrivals([]);
    if (newBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-32 pb-16'>
            {
                newBooks.map(data => <NewArrivalBook key={data._id} data={data}></NewArrivalBook>)
            }
        </section>
    );
};

export default NewArrivalBooks;