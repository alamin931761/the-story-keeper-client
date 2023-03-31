import React from 'react';

const ManageBooksRow = ({ book, index, setDeleteBook }) => {

    return (
        <tr>
            <th className='text-center'>{index + 1}</th>
            <th className='text-center'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={book.image} alt={book.name} />
                    </div>
                </div>
            </th>
            <td className='text-2xl font-bold text-center'>{book.name}</td>
            <td className='text-center'><button className="btn btn-accent">Edit</button></td>
            <td className='text-center'>
                <label onClick={() => setDeleteBook(book)} htmlFor="delete-confirm-modal" className="btn btn-error">Delete</label>
            </td>
        </tr>
    );
};

export default ManageBooksRow;