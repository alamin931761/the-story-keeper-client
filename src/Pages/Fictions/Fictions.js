import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Fiction from './Fiction/Fiction';

const Fictions = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const fictions = allBooks.filter(book => book.category === "fiction");
    if (fictions.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section>
            <PageTitle title='Fiction'></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    fictions.map(data => <Fiction key={data._id} data={data}></Fiction>)
                }
            </div>
        </section>
    );
};

export default Fictions;