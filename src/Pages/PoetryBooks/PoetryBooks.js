import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import PageTitle from '../Shared/PageTitle';
import PoetryBook from './PoetryBook/PoetryBook';

const PoetryBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const poetryBooks = allBooks.filter(book => book.category === "poetry");
    return (
        <section>
            <PageTitle title="Poetry"></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    poetryBooks.map(data => <PoetryBook key={data._id} data={data}></PoetryBook>)
                }
            </div>
        </section>
    );
};

export default PoetryBooks;