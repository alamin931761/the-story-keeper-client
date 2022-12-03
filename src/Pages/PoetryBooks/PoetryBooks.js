import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import PoetryBook from '../PoetryBook/PoetryBook';

const PoetryBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const poetryBooks = allBooks.slice(18, 21);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    poetryBooks.map(data => <PoetryBook key={data._id} data={data}></PoetryBook>)
                }
            </div>
        </section>
    );
};

export default PoetryBooks;