import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookDetailsContext } from '../../App';
import Table from './Table/Table';

const Cart = () => {
    const [bookData, setBookData] = useContext(BookDetailsContext);

    // delete book 
    const deleteBook = (id) => {
        const remainingBooks = bookData.filter(book => book._id !== id);
        setBookData(remainingBooks);
    };

    // cart data 
    let cart;
    if (bookData.length === 0) {
        cart = <h1 className='text-center text-3xl mt-32'>Your cart is empty</h1>
    } else {
        cart = <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th className='pl-[75px]'>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookData.map(data => <Table key={data._id} data={data} deleteBook={deleteBook}></Table>)
                    }
                </tbody>
            </table>
        </div>
    };

    return (
        <section className='pt-32 pb-32'>
            <h1 className='text-5xl text-center'>Cart Page</h1>
            {cart}

            <div>
                <h1 className='text-center text-3xl'>Cart Totals</h1>
                {/* <p>Subtotal: {subTotal}</p> */}
            </div>

            <div className='flex justify-center mt-10'>
                <Link className='btn btn-success' to='/abc'>Proceed to checkout</Link>
            </div>
        </section>
    );
};

export default Cart;