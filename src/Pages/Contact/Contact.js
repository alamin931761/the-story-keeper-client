import React from 'react';
import PageTitle from '../Shared/PageTitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoLocation } from 'react-icons/go';
import { FiPhone } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';

const Contact = () => {
    const [user] = useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        const name = user?.displayName;
        const email = user.email;
        const subject = data.subject;
        const message = data.message;
        console.log('name: ', name)
        console.log('email: ', email)
        console.log('subject: ', subject)
        console.log('message ', message)

        // toast.info("Message send successfully");
        // reset();
    };

    return (
        <section className='common-style'>
            <PageTitle title="Contact"></PageTitle>
            <h2 className='text-5xl text-center'>Contact Us</h2>
            <div className='flex justify-evenly border border-2 border-red-500'>
                <div className='w-full flex flex-col justify-center pl-20'>
                    <div className='flex items-center mb-10'>
                        <GoLocation className='text-5xl mr-3' />
                        <div>
                            <h5 className='text-2xl font-semibold'>Address</h5>
                            <p>Kunming, Yunnan, China</p>
                        </div>
                    </div>

                    <a href="tel:+8613116273029">
                        <div className='flex items-center mb-10'>
                            <FiPhone className='text-5xl mr-3' />
                            <div>
                                <h5 className='text-2xl font-semibold'>Phone</h5>
                                <p>+8613116273029</p>
                            </div>
                        </div>
                    </a>

                    <a href="mailto:alamin931761@gmail.com">
                        <div className='flex items-center mb-10'>
                            <TfiEmail className='text-5xl mr-3' />
                            <div>
                                <h5 className='text-2xl font-semibold'>Email</h5>
                                <p>alamin931761@gmail.com</p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className='w-full'>
                    <h2 className='text-2xl text-center'>Tell Your Message</h2>
                    <form className='flex flex-col justify-center items-center mx-3' onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type='text' className='input input-bordered w-full' value={user?.displayName} disabled />
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input type='text' className='input input-bordered w-full' value={user?.email} disabled />
                        </div>

                        {/* Subject */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Subject</span>
                            </label>
                            <input type='text' className='input input-bordered w-full' {...register("subject", {
                                required: {
                                    value: true,
                                    message: "Subject field is required"
                                }
                            })} />
                            <label className="label">
                                {errors.subject?.type === 'required' && <span className="label-text-alt text-red-400">{errors.subject.message}</span>}
                            </label>
                        </div>

                        {/* Message  */}
                        <div className='w-full'>
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea className="textarea textarea-bordered w-full mb-4 text-base" cols="30" rows="5" {...register("message", {
                                required: {
                                    value: true,
                                    message: "Message field is required"
                                }
                            })} />
                            <label className="label">
                                {errors.message?.type === 'required' && <span className="label-text-alt text-red-400">{errors.message.message}</span>}
                            </label>
                        </div>
                        <input type="submit" value="Send Message" className='btn btn-success' />
                    </form>
                </div>
            </div>
        </section >
    );
};

export default Contact;