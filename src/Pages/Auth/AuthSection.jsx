import React, { useContext, useState } from 'react';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import { AuthContext } from '../../contexts/AuthProvider';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthSection = () => {
    const [isLoginForm, setsIsLoginForm] = useState(true);
    const [formError, setformError] = useState(null);

    return (
        <>
            {
                isLoginForm
                    ? <>
                        <h2 className="mb-3 text-2xl font-semibold text-center">Login to your account</h2>
                        <p className="text-sm text-center text-gray-400">Dont have account?
                            <button onClick={() => setsIsLoginForm(false)} className="focus:underline hover:underline ml-1">Sign up here</button>
                        </p>
                    </>
                    : <>
                        <h2 className="mb-3 text-2xl font-semibold text-center">Sign up a account</h2>
                        <p className="text-sm text-center text-gray-400">Already have account?
                            <button onClick={() => setsIsLoginForm(true)} className="focus:underline hover:underline ml-1">Login here</button>
                        </p>
                    </>
            }
            <div className="my-6 space-y-4">
                <button className='border border-purple-500 hover:bg-purple-500 hover:text-white w-full py-3 rounded mb-2 flex items-center justify-center gap-2'><AiOutlineMail className='w-6 h-6' /> Login with Email</button>
                <button className='border border-green-600 hover:bg-green-600 hover:text-white w-full py-3 rounded mb-2 flex items-center justify-center gap-2'><AiOutlineGoogle className='w-7 h-7' /> Login with Google</button>
                <button className='border border-blue-500 hover:bg-blue-500 hover:text-white w-full py-3 rounded mb-2 flex items-center justify-center gap-2'><AiFillLinkedin className='w-7 h-7' /> Login with LinkedIn</button>
            </div>
            <div className="flex items-center w-full my-4">
                <hr className="w-full text-gray-400" />
                <p className="px-3 text-gray-400">OR</p>
                <hr className="w-full text-gray-400" />
            </div>
            {
                isLoginForm
                    ? <LoginForm
                        formError={formError}
                        setformError={setformError}
                    />
                    : <RegisterForm
                        formError={formError}
                        setformError={setformError}
                    />
            }

        </>
    );
};

export default AuthSection;