import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageBooksRow = ({ book, index, setDeleteBook }) => {
    const { image, name, _id } = book;

    const navigate = useNavigate();

    return (
        <tr>
            <th className='text-center'>{index + 1}</th>
            <th className='text-center'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={image} alt={name} />
                    </div>
                </div>
            </th>
            <td className='text-2xl font-bold text-center'>{name}</td>
            <td className='text-center'>
                <label onClick={() => navigate(`/editBook/${_id}`)} htmlFor="edit-book" className="btn btn-accent">Edit</label>
            </td>

            <td className='text-center'>
                <label onClick={() => setDeleteBook(book)} htmlFor="delete-confirm-modal" className="btn btn-error">Delete</label>
            </td>
        </tr>
    );
};

export default ManageBooksRow;