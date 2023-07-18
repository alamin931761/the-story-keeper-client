import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import ManageBooksRow from './ManageBooksRow/ManageBooksRow';
import DeleteConfirmModal from './DeleteConfirmModal/DeleteConfirmModal';
import PageTitle from '../../Shared/PageTitle';

const ManageBooks = () => {
    const [deleteBook, setDeleteBook] = useState(null);
    // load all books using React query
    const { data: books, isLoading, refetch } = useQuery('books', () => fetch('http://localhost:5000/allBooks', {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    if (books.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div>
            <PageTitle title="Manage Books"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Manage Books ({books.length})</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Avatar</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Edit</th>
                            <th className='text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books?.map((book, index) => <ManageBooksRow key={book._id} book={book} index={index} setDeleteBook={setDeleteBook}></ManageBooksRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deleteBook && <DeleteConfirmModal deleteBook={deleteBook} refetch={refetch} setDeleteBook={setDeleteBook}></DeleteConfirmModal>
            }
        </div>
    );
};

export default ManageBooks;