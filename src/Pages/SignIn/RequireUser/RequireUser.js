import React from 'react';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import useAdmin from '../../../Hooks/useAdmin';
import { signOut } from 'firebase/auth';

const RequireUser = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    const location = useLocation();

    if (loading || adminLoading) {
        return <Loading></Loading>
    }
    if (admin || !user) {
        signOut(auth);
        return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default RequireUser;