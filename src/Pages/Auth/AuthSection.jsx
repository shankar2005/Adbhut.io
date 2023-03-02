import React, { useState } from 'react';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from '../../assets/logos/adbeta.jpeg';
import { RxCross1 } from 'react-icons/rx';

const AuthSection = ({ dispatch }) => {
    const [isLoginForm, setsIsLoginForm] = useState(true);
    const [formError, setformError] = useState(null);

    const closeModal = () => {
        dispatch({ type: "SHOW_LOGIN" });
        setsIsLoginForm(true);
    }

    return (
        <div id='authScroll' className={`pt-6 text-black absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white w-96 h-[90vh] border rounded-md p-5 shadow-2xl ${!isLoginForm && 'overflow-y-scroll'}`}>
            <button onClick={closeModal} className='absolute right-3 top-3'><RxCross1 size={25} /></button>

            <img className='w-16 mx-auto mb-5' src={logo} alt="" />
            {
                isLoginForm
                    ? <h2 className="mb-3 text-2xl font-semibold text-center">Login to your account</h2>
                    : <h2 className="mb-3 text-2xl font-semibold text-center">Sign up a account</h2>
            }

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

            {
                isLoginForm
                    ? <p className="text-sm text-center text-gray-400 mt-4">Dont have account?
                        <button onClick={() => setsIsLoginForm(false)} className="focus:underline hover:underline ml-1">Sign up here</button>
                    </p>
                    : <p className="text-sm text-center text-gray-400 mt-4">Already have account?
                        <button onClick={() => setsIsLoginForm(true)} className="focus:underline hover:underline ml-1">Login here</button>
                    </p>
            }

            <div className="flex items-center w-full my-2">
                <hr className="w-full text-gray-400" />
                <p className="px-3 text-gray-400">OR</p>
                <hr className="w-full text-gray-400" />
            </div>
            <div className="flex items-center justify-center gap-2 my-3 text-gray-600">
                <button className=''><AiOutlineMail className='w-6 h-6' /></button>
                <button className=''><AiOutlineGoogle className='w-7 h-7' /></button>
                <button className=''><AiFillLinkedin className='w-6 h-6' /></button>
            </div>

        </div>
    );
};

export default AuthSection;