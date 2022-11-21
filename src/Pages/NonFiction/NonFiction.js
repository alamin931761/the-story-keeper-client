import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import SingleNonFictionBook from '../SingleNonFictionBook/SingleNonFictionBook';

const NonFiction = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const nonFiction = allBooks.slice(6, 9);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    nonFiction.map(data => <SingleNonFictionBook key={data._id} data={data}></SingleNonFictionBook>)
                }
            </div>
        </section>
    );
};

export default NonFiction;