import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Social from './Social';

const SignUp = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleSignUp = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password);
    }


    return (
        <section className='pt-32'>
            <h2 className='text-center'>Sign Up to Fresh Fruit Warehouse</h2>

            <div>
                <form onSubmit={handleSignUp} className='flex flex-col justify-center items-center'>
                    <input ref={emailRef} type="email" placeholder="Your email address" className="input input-bordered w-full max-w-xs mb-5" />

                    <input ref={passwordRef} type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs mb-5" />

                    <button type='submit' className='btn btn-success'>Sign Up</button>
                </form>
            </div>
            <p>Already have an account? <Link to='/signIn'>Please Sign In</Link></p>
            <Social></Social>
        </section>
    );
};

export default SignUp;