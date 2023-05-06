import React from 'react';
import useBestSellingBooks from '../../Hooks/useBestSellingBooks';
import Loading from '../Shared/Loading';
import BestSellingBook from './BestSellingBook/BestSellingBook';

const BestSellingBooks = () => {
    const [bestsellingBooks] = useBestSellingBooks([]);
    if (bestsellingBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
                {
                    bestsellingBooks.map(data => <BestSellingBook key={data._id} data={data}></BestSellingBook>)
                }
            </div>
        </section>
    );
};

export default BestSellingBooks;