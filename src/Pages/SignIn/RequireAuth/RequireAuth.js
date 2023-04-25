import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>
    }

    // email verification
    if (user.providerData[0].providerId === "password" && !user.emailVerified) {
        return <div className='flex flex-col justify-center items-center h-screen'>
            <h2 className='text-red-400 text-4xl'>Your email is not verified!</h2>
            <h3 className='text-2xl mt-3 mb-3'>Please verify your email address.</h3>
            <button
                className="btn btn-active btn-accent"
                onClick={async () => {
                    const success = await sendEmailVerification();
                    if (success) {
                        toast.info('Verification email sent successfully');
                    }
                }}
            >Verify Your Email Address</button>
        </div>
    }
    return children;
};

export default RequireAuth;