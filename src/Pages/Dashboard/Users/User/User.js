import React from 'react';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const User = ({ allUser, index, refetch }) => {
    const { email, role } = allUser;
    const [user] = useAuthState(auth);

    // make admin 
    const makeAdmin = (emailAddress) => {
        fetch(`https://the-story-keeper-server-ten.vercel.app/user/admin/${emailAddress}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make an admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast('Successfully made an admin');
                }
            });
    };

    // remove admin 
    const removeAdmin = (emailAddress) => {
        fetch(`https://the-story-keeper-server-ten.vercel.app/user/admin/${emailAddress}`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to remove an admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast('Successfully remove an admin');
                }
            });
    }
    // delete user 
    const deleteUser = (emailAddress, role) => {
        if (role === 'admin' && user.email !== 'alamin931761@gmail.com') {
            toast.error(`You can't remove an admin`);
        } else {
            // toast.success(` remove an admin`);

            fetch(`https://the-story-keeper-server-ten.vercel.app/user/${emailAddress}`, {
                method: "DELETE",
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success(`User deleted successfully`);
                        refetch();
                    }
                })
        }
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td className='text-center'>{email}</td>
            <td className='text-center'>{role !== "admin" && user.email === "alamin931761@gmail.com" && <button onClick={() => makeAdmin(email)} className="btn btn-xs btn-outline btn-success">Make Admin</button>}</td>

            <td className='text-center'>{role === 'admin' && email !== 'alamin931761@gmail.com' && user.email === "alamin931761@gmail.com" && <button onClick={() => removeAdmin(email)} className="btn btn-xs btn-outline">Remove Admin</button>}</td>
            <td className='text-center'>{email !== 'alamin931761@gmail.com' && email !== user.email && <button onClick={() => deleteUser(email, role)} className="btn btn-xs btn-outline btn-error">Delete</button>}</td>
        </tr>
    );
};

export default User;