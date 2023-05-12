import React from 'react';

const Order = ({ data }) => {
    const { name, email, address, phoneNumber, books, delivery, date, time, total } = data;
    return (
        <tr>
            <td className='text-center'>{name}</td>
            <td className='text-center'>{email}</td>
            <td className='text-center'>{address}</td>
            <td className='text-center'>{phoneNumber}</td>
            <td className='text-center'>{date}</td>
            <td className='text-center'>{time}</td>
            <td className='flex flex-col items-start'>
                {
                    books.map((book, index) => <span key={book._id} className='block'>{`${index + 1}.`} {book.name} ({book.quantity} piece)</span>)
                }
            </td>
            <td className='text-center'>${total}</td>
            <td>{delivery}</td>
        </tr>
    );
};

export default Order;