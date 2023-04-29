import React from 'react';

const Order = ({ data }) => {
    const { name, email, address, phoneNumber, books, delivery, date, time } = data;
    return (
        <tr>
            <td className='text-center'>{name}</td>
            <td className='text-center'>{email}</td>
            <td className='text-center'>{address}</td>
            <td className='text-center'>{phoneNumber}</td>
            <td className='text-center'>{date}</td>
            <td className='text-center'>{time}</td>
            <td className='border border-red-500 flex flex-col items-center'>
                {
                    books.map((book, index) => <span key={book._id} className='border border-blue-500 block'>{index + 1} {book.name} ({book.quantity} piece)</span>)
                }
            </td>
            <td>{delivery}</td>
        </tr>
    );
};

export default Order;