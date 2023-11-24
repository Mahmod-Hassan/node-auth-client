

import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);
    console.log(user, 'loading',loading)
   if(loading) {
    return <h1 className='text-center mt-20 text-xl'>Loading...</h1>
   }
   else if(user?.email && !loading) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;

};

export default PrivateRoute;