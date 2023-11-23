import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const LoginForm = () => {
    const {getUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
        .then(res => res.json())
        .then(data => {
            if(data.accessToken && !data.message && !data?.error){
                setError('');
                localStorage.setItem('access_token', data?.accessToken);
                localStorage.setItem('loggedIn', true);
                getUser();
                navigate(from, { replace: true });
            }
            else if (data?.error){
                setError(data?.error)
            }
            else if (data.message === 'token expired'){
                setError('token has been expired please login again')
                localStorage.clear();
            }
        })
    }
    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md mt-20">
            <div className="px-6 py-4">
                <h3 className="my-5 text-2xl text-blue-600 font-bold">Please Login</h3>

                <form onSubmit={handleLogin}>

                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address"
                         required
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="w-full mt-4">
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" 
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                    </div>

   {/* error from my erorr state */}
   <p className='text-red-400 text-sm'>{error && <span>{error}</span>}</p>
                    <div className="flex items-center justify-between mt-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-500">Forget Password?</a>

                        <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-50">
                <span className="text-sm text-gray-600">Don't have an account? </span>

                <Link to="/register" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</Link>
            </div>
       </div>
    );
};

export default LoginForm;