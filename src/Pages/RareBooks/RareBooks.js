import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import RareBook from './RareBook/RareBook';

const RareBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const rareBooks = allBooks.filter(book => book.category === "rare-books");
    if (rareBooks.length === 0) {
        return <Loading></Loading>
    }

    return (
        <section>
            <PageTitle title="Rare Books"></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    rareBooks.map(data => <RareBook key={data._id} data={data}></RareBook>)
                }
            </div>
        </section>
    );
};

export default RareBooks;