import React from 'react';
import useRareBooks from '../../Hooks/useRareBooks';
import RareBook from '../RareBook/RareBook';

const RareBooks = () => {
    const [rareBooks, setRareBooks] = useRareBooks([]);
    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    rareBooks.map(data => <RareBook data={data} key={data._id}></RareBook>)
                }
            </div>
        </section>
    );
};

export default RareBooks;