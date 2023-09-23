import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading';
import Card from '../../../Shared/Card';

const RandomBooks = ({ id }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allbooks')
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    if (books.length === 0) {
        return <Loading></Loading>
    }

    // create random full array
    const randomFullIndexArray = [];
    for (let i = books.length - 1; i >= 0; i--) {
        randomFullIndexArray.push(books[Math.floor(Math.random() * i)]);
    };

    // reduce the same book
    const randomIndexArray = randomFullIndexArray.filter((element, index, array) => array.indexOf(element) === index);

    // remove detail page book from the random array
    const randomBooks = randomIndexArray.filter(randomBook => randomBook._id !== id);

    return (
        <div>
            <h2 className='text-center text-3xl second-font mb-6'>You may also like</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    randomBooks.slice(0, 3).map(data => <Card key={data._id} data={data}></Card>)
                }
            </div>
        </div>
    );
};

export default React.memo(RandomBooks);