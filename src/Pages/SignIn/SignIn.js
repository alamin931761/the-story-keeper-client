import React from 'react';
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
import Typewriter from 'typewriter-effect';
import { SlLogin } from 'react-icons/sl';
import { BsArrowRight } from 'react-icons/bs';

const SignIn = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetPasswordError] = useSendPasswordResetEmail(auth);
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
        console.log(resetPasswordError); //------------------------------------------------------>>>
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
        errorElement = <p className='text-error'>Error: {error.message}</p>
    }
    if (loading || sending) {
        return <Loading></Loading>
    }

    return (
        <section className='common-style'>
            <PageTitle title="Sign In"></PageTitle>

            <div className='text-[4vw] flex justify-center mb-5 mt-4'>
                <Typewriter
                    options={{
                        strings: ['Sign In to The Story Keeper'],
                        autoStart: true,
                        loop: true,
                        delay: 100
                    }}
                />
            </div>

            <div>
                <form onSubmit={handleSignIn} className='flex flex-col justify-center items-center'>
                    <input ref={emailRef} type="email" placeholder="Your email address" className="input input-bordered w-full max-w-lg mb-5" required />

                    <input ref={passwordRef} type="password" placeholder="Your password" className="input input-bordered w-full max-w-lg mb-5" required />

                    <button type='submit' className='btn btn-outline'>Sign In <SlLogin className='text-xl ml-2' /></button>
                </form>

                <p className='mt-5'>Forgot your password? <span onClick={handleResetPassword} className='text-blue-500 underline cursor-pointer'>Reset Password<BsArrowRight className='inline text-2xl ml-2' /></span></p>
                <p className='mt-5'>New to The Story Keeper? <Link className='text-blue-500 underline' to='/signUp'>Please Sign Up<BsArrowRight className='inline text-2xl ml-2' /></Link></p>

            </div>
            {errorElement}
            <Social></Social>
        </section>
    );
};

export default SignIn;