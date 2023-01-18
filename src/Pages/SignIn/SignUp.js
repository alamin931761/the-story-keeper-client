import React from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Social from './Social';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useState } from 'react';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import { toast, ToastContainer } from 'react-toastify';


const SignUp = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
    const [agree, setAgree] = useState(false);

    const navigate = useNavigate();

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // const agree = event.target.terms.checked;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        navigate('/home')
    };

    if (loading || updating) {
        return <Loading></Loading>
    }


    return (
        <section className='pt-32'>
            <PageTitle title="Sign Up"></PageTitle>
            <h2 className='text-center'>Sign Up to The Story Keeper</h2>

            <div>
                <form onSubmit={handleSignUp} className='flex flex-col justify-center items-center'>
                    <input ref={nameRef} type="text" placeholder="Your name" className="input input-bordered w-full max-w-xs mb-5" required />

                    <input ref={emailRef} type="email" placeholder="Your email address" className="input input-bordered w-full max-w-xs mb-5" required />

                    <input ref={passwordRef} type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs mb-5" required />

                    <div className='flex items-center'>
                        <input onClick={() => setAgree(!agree)} className="checkbox" name='terms' id='terms' type="checkbox" />
                        {/* <label className={agree ? 'text-warning ml-2' : 'text-error ml-2'} htmlFor="terms">I accept the <span className='underline'>terms and conditions</span></label> */}
                        <label className={`ml-2 ${agree ? 'text-warning' : 'text-error'}`} htmlFor="terms">I accept the <span className='underline'>terms and conditions</span></label>
                    </div>

                    <button disabled={!agree} type='submit' className='btn btn-success'>Sign Up</button>
                </form>
            </div >
            <p>Already have an account? <Link to='/signIn'>Please Sign In</Link></p>
            <Social></Social>
            <ToastContainer></ToastContainer>
        </section >
    );
};

export default SignUp;