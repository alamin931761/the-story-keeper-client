import React, { useRef } from 'react';
import PageTitle from '../Shared/PageTitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoLocation } from 'react-icons/go';
import { FiPhone } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import { SlPaperPlane } from 'react-icons/sl'

const Contact = () => {
    const form = useRef();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        emailjs.sendForm('service_bg6e6vs', "template_8tk8z7h", form.current, 'kEtixGBVNFDZ5Zygz')
            .then((result) => {
                toast.success("Your message has been sent successfully");
            }, (error) => {
                toast.error(`${error.text}`);
            });
        reset();
    }

    return (
        <div className='common-style' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title="Contact"></PageTitle>
            <h2 className='text-3xl text-center my-6'>Contact us</h2>

            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-8'>
                <div className=' flex items-center justify-center w-full'>
                    <div>
                        <div className='flex items-center mb-10'>
                            <GoLocation className='text-5xl mr-3' />
                            <div>
                                <h5 className='text-2xl font-semibold'>Address</h5>
                                <p>Gazipur, Bangladesh</p>
                            </div>
                        </div>

                        <a href="tel:+8613116273029">
                            <div className='flex items-center mb-10'>
                                <FiPhone className='text-5xl mr-3' />
                                <div>
                                    <h5 className='text-2xl font-semibold'>Phone</h5>
                                    <p>+8801741931761</p>
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
                </div>

                <div className='w-full'>
                    <h2 className='text-xl text-center'>Tell Your Message</h2>
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
                        <button type='submit' className='btn btn-outline'>Send Message <SlPaperPlane className='text-xl ml-2' /></button>
                    </form>
                </div>
            </div>

            {/* back button  */}
            <div className='flex justify-center my-6'>
                <Link className='btn btn-outline' to='/'><MdKeyboardBackspace className='text-2xl mr-2' />Back To Home</Link>
            </div>
        </div >
    );
};

export default Contact;