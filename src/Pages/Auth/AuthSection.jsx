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
    const [role, setRole] = useState(null);

    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(closeLogin())
        setsIsLoginForm(true);
    }

    let heading;
    if (role === "Artist") {
        heading = "Sign up as an artist";
    } else if (role === "Client") {
        heading = "Sign up as a client";
    }

    return (
        <div className="font-hero pt-6 text-black bg-white w-96 max-h-[90vh] border rounded-md p-5 shadow-2xl overflow-y-auto scroll-none relative">
            <button onClick={closeModal} className='absolute right-3 top-3'><RxCross1 size={25} /></button>

            <img className='w-16 mx-auto mb-3' src={logo} alt="" />
            {
                isLoginForm
                    ? <h2 className="mb-3 text-2xl font-semibold text-center">Login to your account</h2>
                    : <h2 className="mb-3 text-2xl font-semibold text-center">{
                        heading || "Sign up an account"
                    }</h2>
            }

            {
                isLoginForm
                    ? <LoginForm />
                    : <RegisterForm role={role} setRole={setRole} />
            }

            {
                isLoginForm
                    ? <p className="text-sm text-center text-gray-400 mt-4">Don't have an account?
                        <button onClick={() => setsIsLoginForm(false)} className="focus:underline hover:underline ml-1">Sign up</button>
                    </p>
                    : <p className="text-sm text-center text-gray-400 mt-4">Already have account?
                        <button onClick={() => setsIsLoginForm(true)} className="focus:underline hover:underline ml-1">Login</button>
                    </p>
            }

        </div>
    );
};

export default AuthSection;