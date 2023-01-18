import React from 'react';
import { useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import Social from './Social';

const SignIn = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetPasswordError] = useSendPasswordResetEmail(auth);
    const location = useLocation();

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
    if (user) {
        navigate(from, { replace: true });
    }
    let errorElement;
    if (error) {
        errorElement = <p className='text-error'>Error: {error.message}</p>
    }
    if (loading || sending) {
        return <Loading></Loading>
    }

    return (
        <section className='pt-32'>
            <PageTitle title="Sign In"></PageTitle>
            <h2 className="text-center">Sign In to The Story Keeper</h2>

            <div>
                <form onSubmit={handleSignIn} className='flex flex-col justify-center items-center'>
                    <input ref={emailRef} type="email" placeholder="Your email address" className="input input-bordered w-full max-w-xs mb-5" />

                    <input ref={passwordRef} type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs mb-5" />

                    <button type='submit' className='btn btn-success'>Sign In</button>
                </form>
                <p className='mt-5'>Forgot your password? <span onClick={handleResetPassword} className='text-orange-800'>Reset Password</span></p>
                <p className='mt-5'>New to The Story Keeper? <Link to='/signUp'>Please Sign Up</Link></p>
            </div>
            {errorElement}
            <Social></Social>
            <ToastContainer />
        </section>
    );
};

export default SignIn;