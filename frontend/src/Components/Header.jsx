import React from 'react'
import { Link } from 'react-router-dom';
import { setAuthToken } from '../services';
import {useNavigate} from "react-router-dom"

function Header({show}) {
    const navigate = useNavigate();
    const handleOnClick = () =>{
        localStorage.removeItem('userData');
        setAuthToken(null);
        navigate('/');
    }
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link  className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Resume@Hub</span>
                </Link>
               {show && <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <p  className="text-sm text-gray-500 dark:text-white hover:underline" onClick={handleOnClick}>Logout</p>
                </div>}
            </div>
        </nav>
    );
}

export default Header