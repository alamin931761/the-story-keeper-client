import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Essay from './Essay/Essay';

const Essays = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const essays = allBooks.slice(0, 3);

    return (
        <section>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white pt-32 pb-16'>
                {
                    essays.map(data => <Essay key={data._id} data={data}></Essay>)
                }
            </div>
        </section>
    );
};

export default Essays;