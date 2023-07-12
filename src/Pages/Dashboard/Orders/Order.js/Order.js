import React from 'react';
import { toast } from 'react-toastify';

const Order = ({ data, refetch, index }) => {
    const { _id, name, email, address, phoneNumber, delivery, books, date, time, total, status, transactionId
    } = data;

    const handleStatus = (id) => {
        const status = 'Shipped';
        fetch(`https://the-story-keeper-server-ten.vercel.app/orders/${id}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ status })
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
                        books.map((book, index) => <p key={book._id}>{index + 1}. {book.name} <span className='mr-7'>({book.quantity} piece)</span></p>)
                    }
                </td>
                <td className='text-center'>${total}</td>
                <td className='text-center'>{transactionId}</td>
                <td className='text-center'>{delivery}</td>
                <td className='text-center'><button onClick={() => handleStatus(_id)} className={`${status ? 'btn btn-success' : 'btn btn-outline'}`}>{`${status ? status : 'Pending'}`}</button></td>
            </tr>


        </>
    );
};

export default Order;