import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
     
        try {
          console.log('try block')
          setLoading(true);
          console.log(loading)
          const response = await fetch('https://nodejs-authentication-server.vercel.app/auth/getUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              authorization: `bearer ${localStorage.getItem('access_token')}`,
            }),
          });

          const data = await response.json();
          console.log(data);
         
          if (data?.email) {
            setUser(data);
            setLoading(false);
          }
          else if (data?.email && data?.error) {
            toast.error(data?.error?.message)
          } else {
            setUser({});
          }
        } catch (err) {
          toast.error(err.message)
          setLoading(false);
        }
    };

    useEffect(() => {
      getUser();
     },[])

        const authInfo = {
          user,
          getUser,
          setUser,
          loading
        }

    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;