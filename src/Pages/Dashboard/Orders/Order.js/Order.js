import React from 'react';

const Order = ({ data }) => {
    const { name, email, address, phoneNumber, books } = data;
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>{phoneNumber}</td>
            <td>
                {
                    books.map((book, index) => <tr>{index + 1}. {book.name} ({book.quantity} piece)</tr>)
                }
            </td>
            <td>Express</td>
        </tr>
    );
};

export default Order;