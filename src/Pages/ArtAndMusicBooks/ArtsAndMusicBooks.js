import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import PageTitle from '../Shared/PageTitle';
import ArtsAndMusicBook from './ArtsAndMusicBook/ArtsAndMusicBook';

const ArtsAndMusicBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const artsAndMusicBooks = allBooks.filter(book => book.category === "arts-and-music");
    return (
        <section>
            <PageTitle title="Arts & Music"></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    artsAndMusicBooks.map(data => <ArtsAndMusicBook key={data._id} data={data}></ArtsAndMusicBook>)
                }
            </div>
        </section>
    );
};

export default ArtsAndMusicBooks;