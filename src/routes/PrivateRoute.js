

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);

   if(loading) {
    return <h1 className='text-center mt-20 text-xl'>Loading...</h1>
   }
    if(user?.email) {
        return children;
    }
    else{
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
    }
};

export default PrivateRoute;