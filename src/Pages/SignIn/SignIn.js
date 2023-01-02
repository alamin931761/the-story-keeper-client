import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Social from './Social';

const SignIn = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleSignIn = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password)
    }

    return (
        <section className='pt-32'>
            <h2 className="text-center">Sign In to The Story Keeper</h2>

            <div>
                <form onSubmit={handleSignIn} className='flex flex-col justify-center items-center'>
                    <input ref={emailRef} type="email" placeholder="Your email address" className="input input-bordered w-full max-w-xs mb-5" />

                    <input ref={passwordRef} type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs mb-5" />

                    <button type='submit' className='btn btn-success'>Sign In</button>
                </form>
                <p className='mt-5'>Forgot your password? Reset Password</p>
                <p className='mt-5'>New to The Story Keeper? <Link to='/signUp'>Please Sign Up</Link></p>
            </div>
            <Social></Social>
        </section>
    );
};

export default SignIn;