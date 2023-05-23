import React from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { ImCross } from 'react-icons/im';

const DeleteConfirmModal = ({ deleteBook, refetch, setDeleteBook }) => {

    const handleDelete = id => {
        fetch(`https://the-story-keeper-server-ten.vercel.app/allBooks/${id}`, {
            method: "DELETE",
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount) {
                    toast.success(`${deleteBook.name} has been successfully deleted.`);
                    setDeleteBook(null)
                    refetch();
                }
            })
    };

    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="text-lg text-red-500">Are you sure you want to delete <span className='font-bold'>{deleteBook.name}</span>?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleDelete(deleteBook._id)} className="btn btn-outline btn-error"><MdDelete className="text-2xl mr-2" />Delete</button>
                        <label htmlFor="delete-confirm-modal" className="btn btn-outline"><ImCross className='text-xl mr-2 mb-1' />Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;