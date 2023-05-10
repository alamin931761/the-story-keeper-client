import React, { useRef } from 'react';
import PageTitle from '../Shared/PageTitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoLocation } from 'react-icons/go';
import { FiPhone } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import Typewriter from 'typewriter-effect';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        emailjs.sendForm('service_bg6e6vs', "template_8tk8z7h", form.current, 'kEtixGBVNFDZ5Zygz')
            .then((result) => {
                toast.success("Your message has been sent successfully");
            }, (error) => {
                toast.error("Your message was not sent successfully");
                // console.log(error.text); 
            });
        reset();
    }

    return (
        <section className='common-style'>
            <PageTitle title="Contact"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Contact Us'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div className='flex justify-evenly mt-8'>
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
                    <form ref={form} className='flex flex-col justify-center items-center mx-3' onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input name='user_name' type='text' className='input input-bordered w-full'{...register("user_name", {
                                required: {
                                    value: true,
                                    message: "Name field is required"
                                },
                                minLength: {
                                    value: 2,
                                    message: "Name should be 2 characters or longer"
                                }
                            })} />
                            <label className="label">
                                {errors.user_name?.type === 'required' && <span className="label-text-alt text-red-400">{errors.user_name.message}</span>}
                                {errors.user_name?.type === 'minLength' && <span className="label-text-alt text-red-400">{errors.user_name.message}</span>}
                            </label>
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input name='user_email' type='text' className='input input-bordered w-full' {...register("user_email", {
                                required: {
                                    value: true,
                                    message: "Email field is required"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address"
                                }
                            })} />
                            <label className="label">
                                {errors.user_email?.type === 'required' && <span className="label-text-alt text-red-400">{errors.user_email.message}</span>}
                                {errors.user_email?.type === 'pattern' && <span className="label-text-alt text-red-400">{errors.user_email.message}</span>}
                            </label>
                        </div>

                        {/* Message  */}
                        <div className='w-full'>
                            <label className="label">
                                <span className="label-text">Your Message</span>
                            </label>
                            <textarea name='message' className="textarea textarea-bordered w-full mb-4 text-base" cols="30" rows="5" {...register("message", {
                                required: {
                                    value: true,
                                    message: "Message field is required"
                                }
                            })} />
                            <label className="label">
                                {errors.message?.type === 'required' && <span className="label-text-alt text-red-400">{errors.message.message}</span>}
                            </label>
                        </div>
                        <input type="submit" value="Send Message"
                            className='btn btn-success' />
                    </form>
                </div>
            </div>

            {/* back button  */}
            <div className='flex justify-center mt-14'>
                <Link className='btn btn-primary mb-5 text' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </section >
    );
};

export default Contact;