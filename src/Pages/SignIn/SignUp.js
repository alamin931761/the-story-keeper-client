import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Social from './Social';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useState } from 'react';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import { useForm } from 'react-hook-form';
import useToken from '../../Hooks/useToken';
import { BsArrowRight } from 'react-icons/bs';
import { SlLogin } from 'react-icons/sl';
import { toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

const SignUp = () => {
    const [agree, setAgree] = useState(false);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
    const [showPassword, setShowPassword] = useState(false);
    const [googleRecaptcha, setGoogleRecaptcha] = useState("");
    const [token] = useToken(user);
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        setAgree(false);
        // const agree = event.target.terms.checked;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        reset();
    }

    if (token) {
        navigate('/home');
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    if (error || updateProfileError) {
        toast.error(`${error}`);
    }

    // google recaptcha
    const onChange = (value) => {
        setGoogleRecaptcha(value);
    }

    return (
        <div className='common-style' data-aos="fade-down" data-aos-duration="1000">
            <PageTitle title="Sign Up"></PageTitle>

            <h2 className='text-4xl text-center  my-10'>Sign Up to The Story Keeper</h2>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                    {/* Name */}
                    <div className="form-control w-full max-w-lg mb-5">
                        <label className="label pt-0">
                            <span className="label-text">Your name</span>
                        </label>
                        <input className='input input-bordered w-full max-w-lg' {...register("name", {
                            required: {
                                value: true,
                                message: "Name field is required"
                            },
                            minLength: {
                                value: 2,
                                message: "Name should be 2 characters or longer"
                            }
                        })} />
                        <label className="label pb-0">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-400">{errors.name.message}</span>}
                            {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-400">{errors.name.message}</span>}
                        </label>
                    </div>

                    {/* Email */}
                    <div className="form-control w-full max-w-lg mb-5">
                        <label className="label pt-0">
                            <span className="label-text">Your email address</span>
                        </label>
                        <input className='input input-bordered w-full max-w-lg' {...register("email", {
                            required: {
                                value: true,
                                message: "Email field is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email address"
                            }
                        })} />
                        <label className="label pb-0">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-400">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-400">{errors.email.message}</span>}
                        </label>
                    </div>

                    {/* Password */}
                    <div className="form-control w-full max-w-lg mb-5">
                        <label className="label pt-0">
                            <span className="label-text">Your password</span>
                        </label>
                        <input type={`${showPassword ? 'text' : 'password'}`} className='input input-bordered w-full max-w-lg'{...register("password", {
                            required: {
                                value: true,
                                message: "Password field is required"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
                                message: "Password must be at least 8 characters, at least one uppercase and one lowercase letter, at least one number and one special character(!@#$%^&*)."
                            }
                        })} />
                        <label className="label">
                            <div className='flex items-center'>
                                <input onClick={() => setShowPassword(!showPassword)} className="checkbox" name='password-toggle' id='password-toggle' type="checkbox" />
                                <label className="ml-2 my-0 cursor-pointer" htmlFor="password-toggle">Show Password</label>
                            </div>
                        </label>

                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-400">{errors.password.message}</span>}
                            {errors.password?.type === 'pattern' && <span className="label-text-alt text-red-400">{errors.password.message}</span>}
                        </label>
                    </div>

                    <div className='w-full max-w-lg'>
                        <div className='flex items-center mb-5'>
                            <input onClick={() => setAgree(!agree)} className="checkbox" name='terms' id='terms' type="checkbox" />
                            <label className={`ml-2 ${agree ? 'text-black' : 'text-error'}`} htmlFor="terms">I accept the <span className='underline text-blue-500 cursor-pointer'>terms and conditions</span></label>
                        </div>

                        <ReCAPTCHA className='cursor-pointer' sitekey={process.env.REACT_APP_google_recaptcha_site_key} onChange={onChange} />

                        <button disabled={(googleRecaptcha && agree) ? false : true} type='submit' className='btn btn-outline mt-5'>Sign Up<SlLogin className='text-xl ml-2' /></button>
                    </div>
                </form>
            </div >
            <p className='mt-5'>Already have an account? <Link className='text-blue-500 underline' to='/signIn'>Please Sign In<BsArrowRight className='inline text-2xl ml-2' /></Link></p>
            <Social></Social>
        </div>
    );
};

export default SignUp;