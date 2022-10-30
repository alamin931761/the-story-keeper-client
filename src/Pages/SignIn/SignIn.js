import React from 'react';
import Social from './Social';

const SignIn = () => {
    return (
        <section>
            <p>Sign In Page</p>

            <div>
                <form className='flex flex-col justify-center items-center'>
                    <input type="email" placeholder="Your email address" className="input input-bordered w-full max-w-xs mb-5" />

                    <input type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs mb-5" />

                    <input className='btn btn-outline mb-5' type="submit" value="Sign In" />
                </form>
            </div>
            <Social></Social>
        </section>
    );
};

export default SignIn;