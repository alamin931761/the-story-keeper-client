import React from 'react';
import { toast } from 'react-toastify';

const Order = ({ data, refetch, index }) => {
    const { _id, title, email, address, phoneNumber, delivery, books, date, time, total, status, transactionId, name } = data;

    const handleStatus = (id) => {
        // update status 
        const status = 'Shipped';
        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ status })
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Failed to shipped');
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.info('Shipped')
                }
            })

        // update total sales 
        for (let i = 0; i < books.length; i++) {
            fetch(`http://localhost:5000/book/${books[i]._id}`)
                .then(res => res.json())
                .then(data => {
                    const totalSales = data.totalSales + books[i].quantity;
                    fetch(`http://localhost:5000/allBooks/${books[i]._id}`, {
                        method: "PATCH",
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ totalSales })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                toast.success(`Total sales of ${books[i].title} books have been successfully updated.`)
                            }
                        });
                });
        }
        refetch();
    }

    return (
        <>
            <tr>
                <th className='text-center'>{index + 1}</th>
                <td className='text-center'>{name}</td>
                <td className='text-center'>{email}</td>
                <td className='text-center'>{address}</td>
                <td className='text-center'>{phoneNumber}</td>
                <td className='text-center'>{date}</td>
                <td className='text-center'>{time}</td>
                <td className=''>
                    {
                        books.map((book, index) => <p key={book._id}>{index + 1}. {book.title} <span className='mr-7'>({book.quantity} {book.quantity > 1 ? "pieces" : "piece"})</span></p>)
                    }
                </td>
                <td className='text-center'>${total}</td>
                <td className='text-center'>{transactionId}</td>
                <td className='text-center'>{delivery}</td>
                <td className='text-center'><button onClick={() => handleStatus(_id)} disabled={status ? true : false} className="btn btn-outline transition ease-linear duration-500">{`${status ? status : 'Pending'}`}</button></td>
            </tr>
        </>
    );
};

export default Order;