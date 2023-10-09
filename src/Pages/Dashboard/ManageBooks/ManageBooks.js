import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import ManageBooksRow from './ManageBooksRow/ManageBooksRow';
import DeleteConfirmModal from './DeleteConfirmModal/DeleteConfirmModal';
import PageTitle from '../../Shared/PageTitle';
import { GoBook } from 'react-icons/go';

const ManageBooks = () => {
    const [deleteBook, setDeleteBook] = useState(null);
    // load all books using React query
    const { data: books, isLoading, refetch } = useQuery('books', () => fetch('https://the-story-keeper-server-ebon.vercel.app/allBooks', {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    let loading;
    if (isLoading) {
        loading = <Loading></Loading>;
    }

    let manageBookContainer;
    if (books?.length > 0) {
        manageBookContainer = <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Avatar</th>
                            <th className='text-center'>Title</th>
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
    } else {
        manageBookContainer = <div className='w-full mt-6 flex flex-col items-center justify-center'>
            <GoBook className='text-7xl opacity-5' />
            <p className='second-font'>No books have been added to this website yet</p>
        </div>
    }

    return (
        <div data-aos="fade-right" data-aos-duration="1000">
            <PageTitle title="Manage Books"></PageTitle>
            <h2 className='text-center text-3xl my-6 second-font'>Manage Books ({books?.length})</h2>

            {loading}

            {manageBookContainer}
        </div>
    );
};

export default ManageBooks;