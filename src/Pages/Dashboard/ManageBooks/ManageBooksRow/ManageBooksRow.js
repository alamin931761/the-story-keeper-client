import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const ManageBooksRow = ({ book, index, setDeleteBook }) => {
    const { image, title, _id } = book;

    const navigate = useNavigate();

    return (
        <tr>
            <th className='text-center'>{index + 1}</th>
            <th className='text-center'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={image} alt={title} />
                    </div>
                </div>
            </th>
            <td className='text-2xl font-bold text-center'>{title}</td>
            <td className='text-center'>
                <label onClick={() => navigate(`/editBook/${_id}`)} htmlFor="edit-book" className="btn btn-outline"><BiEdit className='text-2xl mr-2' />Edit</label>
            </td>

            <td className='text-center'>
                <label onClick={() => setDeleteBook(book)} htmlFor="delete-confirm-modal" className="btn btn-outline btn-error"><MdDelete className='text-2xl mr-2' />Delete</label>
            </td>
        </tr>
    );
};

export default ManageBooksRow;