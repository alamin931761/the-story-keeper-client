import React from 'react';
import useAllBooks from '../../Hooks/useAllBooks';
import PageTitle from '../Shared/PageTitle';
import NonFictionBook from './NonFictionBook/NonFictionBook';

const NonFictionBooks = () => {
    const [allBooks, setAllBooks] = useAllBooks([]);
    const nonFiction = allBooks.filter(book => book.category === "non-fiction");
    return (
        <section>
            <PageTitle title='Non-Fiction'></PageTitle>
            <div className='common-style grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 bg-white'>
                {
                    nonFiction.map(data => <NonFictionBook key={data._id} data={data}></NonFictionBook>)
                }
            </div>
        </section>
    );
};

export default NonFictionBooks;