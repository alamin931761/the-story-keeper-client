import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Essay from './Essay/Essay';

const Essays = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const essays = allBooks.filter(book => book.category === "essays");
    if (essays.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section>
            <PageTitle title='Essays'></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    essays.map(data => <Essay key={data._id} data={data}></Essay>)
                }
            </div>
        </section>
    );
};

export default Essays;