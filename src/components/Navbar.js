import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
    const {user, setUser} = useContext(AuthContext);
    const handleLogout = () => {
        localStorage.clear();
        setUser({})
    }
    return (
        <div className='flex justify-between items-center border-b px-10 py-5'>
            <h1 className='text-xl font-bold'>
                <Link to='/'>Node Auth</Link>
            </h1>
            <ul className='flex items-center gap-4'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li>
                  {
                    !user?.email ?
                    (
                    <Link to='/login'>
                      <button className="px-6 py-2 text-sm text-white font-medium  transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-400 ">Login</button>
                   </Link>
                    )
                    :
                    (
                   <button
                   onClick={handleLogout}
                   className="px-6 py-2 text-sm text-white font-medium  transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-gray-400 ">Logout</button>

                    )
                  }
                </li>
            </ul>
        </div>
    );
};

export default Navbar;