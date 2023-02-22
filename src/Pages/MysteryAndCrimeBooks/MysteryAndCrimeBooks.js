import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import PageTitle from '../Shared/PageTitle';
import MysteryAndCrimeBook from './MysteryAndCrimeBook/MysteryAndCrimeBook';

const MysteryAndCrimeBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const mysteryAndCrimeBooks = allBooks.filter(book => book.category === "mystery-and-crime");
    return (
        <section>
            <PageTitle title="Mystery & Crime"></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    mysteryAndCrimeBooks.map(data => <MysteryAndCrimeBook key={data._id} data={data}></MysteryAndCrimeBook>)
                }
            </div>
        </section>
    );
};

export default MysteryAndCrimeBooks;