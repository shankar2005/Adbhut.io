import React, { useState } from 'react';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
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
            <div className="flex items-center justify-center gap-2 my-3">
                <button className=''><AiOutlineMail className='w-6 h-6' /></button>
                <button className=''><AiOutlineGoogle className='w-7 h-7' /></button>
                <button className=''><AiFillLinkedin className='w-6 h-6' /></button>
            </div>
            <div className="flex items-center w-full mb-2">
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