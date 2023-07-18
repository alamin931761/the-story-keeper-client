import React, { useEffect, useState } from 'react';
import AllBook from './AllBook/AllBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [count, setCount] = useState(0);
    const [priceRange, setPriceRange] = useState(2000);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);

    useEffect(() => {
        fetch(`http://localhost:5000/books?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setBooks(data.books);
            })
    }, [page, size])

    useEffect(() => {
        setFilteredBooks(books.filter(book => book.price < parseInt(priceRange)))
    }, [books, priceRange])

    // loading
    if (books.length === 0) {
        return <Loading></Loading>
    }

    // price range 



    // pagination 
    const pages = Math.ceil(count / size);

    // sort 
    const sortedBooks = (event) => {
        if (event.target.value === 'low-high') {
            setFilteredBooks(filteredBooks.sort((a, b) => a.price - b.price));
            console.log(filteredBooks);
        }
        if (event.target.value === 'high-low') {
            console.log(event.target.value);
            setFilteredBooks(filteredBooks.sort((a, b) => b.price - a.price));
            console.log(filteredBooks);
        }
    }

    return (
        <div className='common-style'>
            <PageTitle title="All Books"></PageTitle>
            <h2 className="text-center text-3xl">All Books ({filteredBooks.length})</h2>

            {/* sort  */}
            <div className='flex'>
                <p>Short By: </p>
                <select onChange={sortedBooks}>
                    <option disabled selected>Default</option>
                    <option value="low-high">Price (Low - High)</option>
                    <option value="high-low">Price (High - Low)</option>
                </select>
            </div>

            {/* price range  */}
            <div>
                <h2>Price Range ({priceRange})</h2>
                <input className={`range range-lg`} type="range" min="0" max="2000" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    filteredBooks.map(data => <AllBook key={data._id} data={data}></AllBook>)
                }
            </div>

            {/* pagination */}
            <div className='text-center mt-20'>
                <p>page number {page}</p>
                {
                    [...Array(pages).keys()].map(number => <button key={number} onClick={() => setPage(number)} className={page === number ? 'btn btn-warning mx-2' : 'btn mx-2'}>{number + 1}</button>)
                }

                <div className='flex'>
                    <p>show: </p>
                    <select onChange={event => setSize(event.target.value)}>
                        <option value={9} selected>9</option>
                        <option value={12}>12</option>
                    </select>
                </div>
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-outline mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default AllBooks;