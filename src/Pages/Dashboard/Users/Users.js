import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import User from './User/User';
import PageTitle from '../../Shared/PageTitle';
import Typewriter from 'typewriter-effect';

const Users = () => {
    // users data load using React query
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://the-story-keeper-server-ten.vercel.app/users', {
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

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: [`Users (${users.length})`],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

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
        </section>
    );
};

export default Users;