import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import User from './User/User';

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
            <h2 className="text-center text-3xl">Users: {users.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Make Admin</th>
                            <th className='text-center'>Remove User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <User key={user._id} user={user} index={index} refetch={refetch}></User>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Users;