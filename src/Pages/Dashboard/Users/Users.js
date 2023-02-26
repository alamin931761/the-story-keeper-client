import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import User from './User/User';

const Users = () => {
    const { data: users, isLoading } = useQuery('users', () => fetch('http://localhost:5000/users').then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section>
            <h2 className="text-center text-3xl">Users: {users.length}</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <User key={user._id} user={user} index={index}></User>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Users;