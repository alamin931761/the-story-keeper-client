import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deleteBook, refetch, setDeleteBook }) => {

    const handleDelete = id => {
        fetch(`http://localhost:5000/allBooks/${id}`, {
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
                        <button onClick={() => handleDelete(deleteBook._id)} className="btn btn-error">Delete</button>
                        <label htmlFor="delete-confirm-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;