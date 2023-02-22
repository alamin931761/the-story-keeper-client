import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import PageTitle from '../Shared/PageTitle';
import SciFiFantasyAndHorrorBook from './SciFiFantasyAndHorrorBook/SciFiFantasyAndHorrorBook';

const SciFiFantasyAndHorrorBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const SciFiFantasyAndHorrorBooks = allBooks.filter(book => book.category === "sci-fi-fantasy-and-horror");
    return (
        <section>
            <PageTitle title="Sci-Fi, Fantasy & Horror"></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    SciFiFantasyAndHorrorBooks.map(data => <SciFiFantasyAndHorrorBook key={data._id} data={data}></SciFiFantasyAndHorrorBook>)
                }
            </div>
        </section>
    );
};

export default SciFiFantasyAndHorrorBooks;