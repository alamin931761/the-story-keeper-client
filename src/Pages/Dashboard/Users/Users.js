import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import User from './User/User';
import PageTitle from '../../Shared/PageTitle';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';

const Users = () => {
    // users data load using React query
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users', {
        method: "GET",
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
        }
        return res.json();
    }));
    if (isLoading) {
        return <Loading></Loading>
    }

    if (users.length === 0) {
        return <Loading></Loading>
    }

    return (
        <div data-aos="fade-right" data-aos-duration="1000">
            <PageTitle title="Users"></PageTitle>
            <h2 className='text-center text-3xl my-6'>Users ({users.length})</h2>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Make Admin</th>
                            <th className='text-center'>Remove Admin</th>
                            <th className='text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((allUser, index) => <User key={allUser._id} allUser={allUser} index={index} refetch={refetch}></User>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;