import React from 'react';

const Order = ({ data }) => {
    const { name, email, address, phoneNumber, books } = data;
    console.log(books)
    return (
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>{phoneNumber}</td>
            <td>
                {
                    books.map(book => <tr>{books.indexOf(book) + 1}. {book.name}</tr>)
                }
            </td>
        </tr>
    );
};

export default Order;