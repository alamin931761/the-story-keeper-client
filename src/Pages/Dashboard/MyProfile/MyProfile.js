import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import image from '../../../assets/images/user-default-image.png';
import PageTitle from '../../Shared/PageTitle';
import Typewriter from 'typewriter-effect';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [updateProfile, setUpdateProfile] = useState([]);

    const imageRef = useRef("");
    const numberRef = useRef("");
    const addressRef = useRef("");
    const linkedInRef = useRef("");
    const handleSubmit = event => {
        event.preventDefault();
        const profile = {
            name: user?.displayName,
            email: user?.email,
            imageURL: imageRef.current.value,
            phoneNumber: numberRef.current.value,
            address: addressRef.current.value,
            linkedInLink: linkedInRef.current.value
        };

        // update profile
        fetch(`http://localhost:5000/user/${user.email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.result.modifiedCount > 0) {
                    toast.success("Profile updated successfully");
                } else {
                    toast.info("All values are the same")
                }
            });
        event.target.reset();
    };

    // load user profile data
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user.email}`, {
            method: "GET",
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'content-type': 'application/json'
        })
            .then(res => res.json())
            .then(data => setUpdateProfile(data))
    }, [updateProfile])

    // image 
    let profilePicture = '';
    if (updateProfile[0]?.imageURL) {
        profilePicture = updateProfile[0]?.imageURL;
    } else {
        profilePicture = image;
    }

    return (
        <section className='mb-10'>
            <PageTitle title="My Profile"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['My Profile'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className="flex justify-evenly items-center">
                <div className='bg-white drop-shadow-2xl rounded-2xl p-4 w-[450px]'>
                    <div className="avatar flex justify-center mb-5">
                        <div className="w-80 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={profilePicture} alt="" />
                        </div>
                    </div>
                    <p className='mb-3'><span className='font-bold text-xl'>Name: </span>{user.displayName}</p>
                    <p className='mb-3'><span className='font-bold text-xl'>Email: </span>{user.email}</p>
                    <p className='mb-3'><span className='font-bold text-xl'>Address: </span>{updateProfile[0]?.address}</p>
                    <p className='mb-3'><span className='font-bold text-xl'>Phone Number: </span>{updateProfile[0]?.phoneNumber}</p>
                    <p className='mb-3'><span className='font-bold text-xl'>LinkedIn profile link: </span>{updateProfile[0]?.linkedInLink}</p>
                </div>

                <div className='w-1/2'>
                    <h2 className='text-3xl text-center mb-4'>Update Profile</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center mx-3 w-full'>
                        <input value={user.displayName} className='input input-bordered w-full max-w-lg mb-2' disabled />

                        <input value={user.email} className='input input-bordered w-full max-w-lg mb-2' disabled />

                        <input ref={imageRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='Image URL' />

                        <input ref={numberRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='Phone Number' />

                        <input ref={addressRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='Address' />

                        <input ref={linkedInRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='LinkedIn profile link' />

                        <input className='btn btn-primary' type="submit" value="Update Profile" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;