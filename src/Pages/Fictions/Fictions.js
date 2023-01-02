import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Fiction from './Fiction/Fiction';

const Fictions = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const fictions = allBooks.slice(3, 6);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    fictions.map(data => <Fiction key={data._id} data={data}></Fiction>)
                }
            </div>
        </section>
    );
};

export default Fictions;