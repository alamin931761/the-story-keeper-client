import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Social from './Social';
import { SlLogin } from 'react-icons/sl';
import { BsArrowRight } from 'react-icons/bs';
import ReCAPTCHA from 'react-google-recaptcha';

const SignIn = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetPasswordError] = useSendPasswordResetEmail(auth);
    const [googleRecaptcha, setGoogleRecaptcha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const [token] = useToken(user);

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const handleSignIn = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
    };

    // reset password 
    const handleResetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.info('An email has been sent to reset your password');
        } else {
            toast.error("Please enter your email address")
        }
    }
    if (resetPasswordError) {
        toast.error(`${resetPasswordError}`);
    }

    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])

    let errorElement;
    if (error) {
        errorElement = <p className='text-error mt-2 text-center'>{error.message}</p>
    }
    if (loading || sending) {
        return <Loading></Loading>
    }

    // google recaptcha 
    const onChange = (value) => {
        setGoogleRecaptcha(value);
    }

    return (
        <div className='common-style' data-aos="fade-up" data-aos-duration="1000">
            <PageTitle title="Sign In"></PageTitle>

            <h2 className='text-4xl text-center  my-10'>Sign In to The Story Keeper</h2>

            <div>
                <form onSubmit={handleSignIn} className='flex flex-col justify-center items-center'>
                    <p className='w-full max-w-lg text-sm mb-2'>Your Email Address</p>
                    <input ref={emailRef} type="email" className="input input-bordered w-full max-w-lg mb-5" required />

                    <p className='w-full max-w-lg text-sm mb-2'>Your Password</p>
                    <input ref={passwordRef} type={`${showPassword ? 'text' : 'password'}`} className="input input-bordered w-full max-w-lg mb-2" required />
                    <div className='flex items-center mb-5 w-full max-w-lg'>
                        <input onClick={() => setShowPassword(!showPassword)} className="checkbox" name='password-toggle' id='password-toggle' type="checkbox" />
                        <label className="ml-2 my-0 cursor-pointer" htmlFor="password-toggle">Show Password</label>
                    </div>

                    <div className='w-full max-w-lg'>
                        <ReCAPTCHA sitekey={process.env.REACT_APP_google_recaptcha_site_key} onChange={onChange} />
                        <button disabled={googleRecaptcha ? false : true} type='submit' className='btn btn-outline mt-5'>Sign In <SlLogin className='text-xl ml-2' /></button>
                    </div>

                </form>

                <p className='mt-5'>Forgot your password? <span onClick={handleResetPassword} className='text-blue-500 underline cursor-pointer'>Reset Password<BsArrowRight className='inline text-2xl ml-2' /></span></p>
                <p className='mt-5'>New to The Story Keeper? <Link className='text-blue-500 underline' to='/signUp'>Please Sign Up<BsArrowRight className='inline text-2xl ml-2' /></Link></p>

            </div>
            {errorElement}
            <Social></Social>
        </div>
    );
};

export default SignIn;