import React, { useEffect } from 'react';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import useToken from '../../Hooks/useToken';

const Social = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
    const [token] = useToken(googleUser || githubUser || facebookUser);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);

    if (googleLoading || githubLoading || facebookLoading) {
        return <Loading></Loading>;
    }

    let errorElement;
    if (googleError || githubError || facebookError) {
        errorElement = <p className='text-error text-center mt-2'>{googleError?.message} {githubError?.message}</p>
    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className='flex flex-col justify-center mb-3'>
                <button onClick={() => signInWithGoogle()} className='btn btn-outline mt-3 w-[300px] mx-auto'><FcGoogle className='text-3xl mr-1' />Continue with Google</button>

                <button onClick={() => signInWithGithub()} className='btn btn-outline mt-3 w-[300px] mx-auto'><BsGithub className='text-3xl mr-1' />Continue with Github</button>

                <button onClick={() => signInWithFacebook()} className='btn btn-outline mt-3 w-[300px] mx-auto'><FaFacebookSquare className='text-3xl mr-1' />Continue with Facebook</button>
            </div>
            {errorElement}
        </div>
    );
};

export default Social;