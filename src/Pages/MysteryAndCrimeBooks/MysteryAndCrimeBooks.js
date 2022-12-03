import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import MysteryAndCrimeBook from '../MysteryAndCrimeBook/MysteryAndCrimeBook';

const MysteryAndCrimeBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const mysteryAndCrimeBooks = allBooks.slice(15, 18);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    mysteryAndCrimeBooks.map(data => <MysteryAndCrimeBook key={data._id} data={data}></MysteryAndCrimeBook>)
                }
            </div>
        </section>
    );
};

export default MysteryAndCrimeBooks;