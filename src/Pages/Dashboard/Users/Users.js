import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import User from './User/User';
import PageTitle from '../../Shared/PageTitle';

const Users = () => {
    // users data load using React query
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users', {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    if (users.length === undefined) {
        return <Loading></Loading>
    }

    return (
        <section>
            <PageTitle title="Users"></PageTitle>
            <h2 className="text-center text-3xl">Users: {users.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Make Admin</th>
                            <th className='text-center'>Remove Admin</th>
                            <th className='text-center'>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((allUser, index) => <User key={allUser._id} allUser={allUser} index={index} refetch={refetch}></User>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Users;