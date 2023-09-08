import React, { useEffect, useState } from 'react';
import AllBook from './AllBook/AllBook';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import PageTitle from '../../Shared/PageTitle';
import Loading from '../../Shared/Loading';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0);
    const [priceRange, setPriceRange] = useState(2000);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [sorted, setSorted] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/books?page=${page}&size=${size}`, {
            headers: {
                sorted: sorted
            }
        })
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setBooks(data.books);
            })
    }, [page, size, sorted])


    // loading
    if (books.length === 0) {
        return <Loading></Loading>
    }

    // price range
    const filteredBooks = books.filter(book => book.price < parseInt(priceRange));


    // pagination
    const pages = Math.ceil(count / size);

    // sort
    const sortedBooks = (event) => {
        if (event.target.value === 'low-high') {
            setSorted(event.target.value);
        } else if (event.target.value === 'high-low') {
            setSorted(event.target.value);
        } else {
            setSorted(event.target.value);
        }
    }

    const handleSelectChange = event => {
        setSize(parseInt(event.target.value));
        setPage(0);
    }

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="All Books"></PageTitle>
            <h2 className="text-center text-3xl my-6">All Books</h2>

            <div className='flex justify-between flex-wrap mb-6'>
                {/* price range  */}
                <div className='w-[330px]'>
                    <p>Price Range</p>
                    <p>$0 - ${priceRange}</p>
                    <input className="range range-md" type="range" min="0" max="2000" value={priceRange} onChange={(event) => setPriceRange(event.target.value)} />
                </div>

                <div className='flex flex-wrap'>
                    {/* show  */}
                    <div className='flex items-center mr-10 mb-2'>
                        <p className='mr-2'>Show: </p>
                        <select onChange={handleSelectChange} className="select select-bordered w-[75px]">
                            <option value="3" selected>3</option>
                            <option value="6">6</option>
                            <option value="9">9</option>
                            <option value="12">12</option>
                            <option value="15">15</option>
                        </select>
                    </div>

                    {/* sort  */}
                    <div className='flex items-center'>
                        <p className='mr-2'>Sort By:</p>
                        <select onChange={sortedBooks} className="select select-bordered w-[185px]">
                            <option value="default">Default</option>
                            <option value="low-high">Price (Low - High)</option>
                            <option value="high-low">Price (High - Low)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    filteredBooks.map(data => <AllBook key={data._id} data={data}></AllBook>)
                }
            </div>

            {/* pagination */}
            <div className='text-center my-6'>
                {
                    [...Array(pages).keys()].map(number => <button key={number} onClick={() => setPage(number)} className={page === number ? 'btn btn-warning mx-2' : 'btn mx-2'}>{number + 1}</button>)
                }
            </div>

            {/* back button  */}
            <div className='flex justify-center mb-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div>
    );
};

export default AllBooks;