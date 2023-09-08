import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import PageTitle from '../../Shared/PageTitle';
import Loading from '../../Shared/Loading';
import { useForm } from 'react-hook-form';
import { BiEdit } from 'react-icons/bi';
import { signOut } from 'firebase/auth';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [updatePassword, updating, error] = useUpdatePassword(auth);

    const [profileData, setProfileData] = useState([]);

    const imageRef = useRef("");
    const numberRef = useRef("");
    const addressRef = useRef("");
    const handleUpdateProfile = event => {
        event.preventDefault();
        const profile = {
            name: user?.displayName,
            email: user?.email,
            imageURL: imageRef.current.value,
            phoneNumber: numberRef.current.value,
            address: addressRef.current.value,
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
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
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
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => setProfileData(data))
    }, [profileData, user.email])

    // image 
    const image = 'https://i.ibb.co/4WCwkWc/user-default-image.png';
    let profilePicture = '';
    if (profileData[0]?.imageURL) {
        profilePicture = profileData[0]?.imageURL;
    } else {
        profilePicture = image;
    }

    // update password 
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const password1 = data.newPassword;
        const password2 = data.newPassword2;
        if (password1 === password2) {
            const success = await updatePassword(password1);
            if (success) {
                toast.info(`Password updated successfully`);
                reset();
            }
        } else {
            toast.error("Passwords did not match. Try again.");
            reset();
        }
    }

    if (error) {
        toast.error(`${error.message}`)
    }
    if (updating) {
        return <Loading></Loading>
    }

    return (
        <div className='mx-3' data-aos="fade-right" data-aos-duration="1000">
            <PageTitle title="My Profile"></PageTitle>
            <h2 className='text-center text-3xl my-6'>My Profile</h2>

            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                {/* profile info */}
                <div className='flex justify-center items-center'>
                    <div className="lg:w-[450px] w-full">
                        <div className='bg-[#DFF6FF] p-4 rounded-lg'>
                            <div className='flex justify-end mb-5'>
                                <label htmlFor="my-modal-3" className="btn btn-outline"><BiEdit className='text-2xl mr-2' />Edit Profile</label>
                            </div>
                            <div className="avatar flex justify-center mb-5">
                                <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={profilePicture} alt="" />
                                </div>
                            </div>
                            <p className='mb-3'><span className='font-bold text-xl'>Name: </span>{user.displayName}</p>
                            <p className='mb-3 break-all'><span className='font-bold text-xl'>Email: </span>{user.email}</p>
                            <p className='mb-3 break-all'><span className='font-bold text-xl'>Address: </span><span>{profileData[0]?.address}</span></p>
                            <p className='mb-3 break-all'><span className='font-bold text-xl'>Phone Number: </span>{profileData[0]?.phoneNumber}</p>
                        </div>
                    </div>
                </div>

                {/* change password  */}
                <div className='flex flex-col justify-center my-6'>
                    <h2 className='text-2xl text-center mb-4'>Update Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                        {/* New Password */}
                        <div className="form-control w-full max-w-lg mb-2">
                            <input type='password' className='input input-bordered w-full max-w-lg' placeholder='New Password' {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: "New Password field is required"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
                                    message: "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
                                }
                            })} />
                            <label className="label">
                                {errors.newPassword?.type === 'required' && <span className="label-text-alt text-red-400">{errors.newPassword.message}</span>}
                                {errors.newPassword?.type === 'pattern' && <span className="label-text-alt text-red-400">{errors.newPassword.message}</span>}
                            </label>
                        </div>

                        {/* New Password 2 */}
                        <div className="form-control w-full max-w-lg">
                            <input type='password' className='input input-bordered w-full max-w-lg' placeholder='Confirm New Password' {...register("newPassword2", {
                                required: {
                                    value: true,
                                    message: "New Password field is required"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
                                    message: "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
                                }
                            })} />
                            <label className="label">
                                {errors.newPassword2?.type === 'required' && <span className="label-text-alt text-red-400">{errors.newPassword2.message}</span>}
                                {errors.newPassword2?.type === 'pattern' && <span className="label-text-alt text-red-400">{errors.newPassword2.message}</span>}
                            </label>
                        </div>

                        <input className='btn btn-outline' type="submit" value="Update Password" />
                    </form>
                </div>

                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal bg-[#00000094]">
                    <div className="modal-box relative bg-[#DFF6FF]">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h2 className='text-2xl text-center mb-4'>Update Profile</h2>

                        <form onSubmit={handleUpdateProfile} className='flex flex-col items-center w-full'>
                            <input value={user.displayName} className='input input-bordered w-full max-w-lg mb-2' disabled />
                            <input value={user.email} className='input input-bordered w-full max-w-lg mb-2' disabled />
                            <input ref={imageRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='Image URL' />
                            <input ref={numberRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='Phone Number' />
                            <input ref={addressRef} className='input input-bordered w-full max-w-lg mb-2' placeholder='Address' />
                            <input className='btn btn-outline' type="submit" value="Update Profile" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;