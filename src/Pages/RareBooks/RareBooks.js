import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import RareBook from './RareBook/RareBook';

const RareBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const rareBooks = allBooks.slice(21, 27);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    rareBooks.map(data => <RareBook key={data._id} data={data}></RareBook>)
                }
            </div>
        </section>
    );
};

export default RareBooks;