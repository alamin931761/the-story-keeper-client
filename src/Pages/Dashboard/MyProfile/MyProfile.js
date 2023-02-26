import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    console.log(user);
    console.log(user.displayName);
    console.log(user.email);
    return (
        <section>
            <h2 className='text-center text-5xl mt-12'>This is my Profile Page</h2>
            <form className='flex flex-col mx-3'>
                <input type="text" value={user.displayName} className="px-3 py-2 border border-red-500" />
                <input type="text" value={user.email} className="px-3 py-2 border border-red-500" />
                <input type="text" placeholder='Phone Number' className="px-3 py-2 border border-red-500" />
                <input type="text" placeholder='Location/Address' className="px-3 py-2 border border-red-500" />
            </form>
        </section>
    );
};

export default MyProfile;