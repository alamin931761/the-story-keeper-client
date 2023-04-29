import React from 'react';
import { toast } from 'react-toastify';

const Order = ({ data, refetch }) => {
    const { _id, name, email, address, phoneNumber, delivery, books, date, time, total, status } = data;

    const handleStatus = (id) => {
        const status = 'Shipped';
        fetch(`http://localhost:5000/orders/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ address, books, date, delivery, email, name, phoneNumber, time, total, status })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.info('Shipped')
                }
            })
        refetch();
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>{phoneNumber}</td>
            <td>{date}</td>
            <td>{time}</td>
            <td>
                {
                    books.map((book, index) => <span key={book._id}>{index + 1}. {book.name} <span className='mr-7'>({book.quantity} piece)</span></span>)
                }
            </td>
            <td>{delivery}</td>
            <td><button onClick={() => handleStatus(_id)} className='btn btn-success'>{`${status ? status : 'Pending'}`}</button></td>
        </tr>
    );
};

export default Order;