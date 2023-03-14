import React, { useState } from 'react';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from '../../assets/logos/adbeta.jpeg';
import { RxCross1 } from 'react-icons/rx';
import { closeLogin } from '../../features/dropdown/dropdownSlice';
import { useDispatch } from 'react-redux';

const AuthSection = () => {
    const [isLoginForm, setsIsLoginForm] = useState(true);

    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(closeLogin())
        setsIsLoginForm(true);
    }

    return (
        <div id='authScroll' className="pt-6 text-black bg-white w-96 max-h-[90vh] border rounded-md p-5 shadow-2xl overflow-y-auto relative">
            <button onClick={closeModal} className='absolute right-3 top-3'><RxCross1 size={25} /></button>

            <img className='w-16 mx-auto mb-5' src={logo} alt="" />
            {
                isLoginForm
                    ? <h2 className="mb-3 text-2xl font-semibold text-center">Login to your account</h2>
                    : <h2 className="mb-3 text-2xl font-semibold text-center">Sign up a account</h2>
            }

            {
                isLoginForm
                    ? <LoginForm />
                    : <RegisterForm />
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