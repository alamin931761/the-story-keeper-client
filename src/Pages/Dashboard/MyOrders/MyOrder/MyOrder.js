import React from 'react';

const Order = ({ data }) => {
    const { name, email, address, phoneNumber, books } = data;
    console.log(books)
    return (
        <tr>
            <td className='text-center'>{name}</td>
            <td className='text-center'>{email}</td>
            <td className='text-center'>{address}</td>
            <td className='text-center'>{phoneNumber}</td>
            <td className='border border-red-500 flex flex-col items-center'>
                {
                    books.map((book, index) => <tr className='border border-blue-500 block'>{index + 1}. {book.name}</tr>)
                }
            </td>
        </tr>
    );
};

export default Order;