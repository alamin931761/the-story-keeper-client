import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import ArtsAndMusicBook from './ArtsAndMusicBook/ArtsAndMusicBook';

const ArtsAndMusicBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const artsAndMusicBooks = allBooks.slice(12, 15);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    artsAndMusicBooks.map(data => <ArtsAndMusicBook key={data._id} data={data}></ArtsAndMusicBook>)
                }
            </div>
        </section>
    );
};

export default ArtsAndMusicBooks;