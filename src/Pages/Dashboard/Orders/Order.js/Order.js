import React from 'react';

const Order = ({ data }) => {
    const { name, email, address, phoneNumber, delivery, books, date, time, paid } = data;
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
                    books.map((book, index) => <span key={book._id}>{index + 1}. {book.name} ({book.quantity} piece)</span>)
                }
            </td>
            <td>{delivery}</td>
            <td>{paid && <span>paid</span>}</td>
        </tr>
    );
};

export default Order;