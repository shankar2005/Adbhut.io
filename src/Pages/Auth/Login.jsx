import React, { useContext, useState } from 'react';
import { AiFillLinkedin, AiOutlineMail, AiOutlineGoogle } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const [loginError, setLoginError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setLoginError(null);
        fetch('http://3.109.54.147/api/v1/auth/login/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    const cookies = new Cookies();
                    cookies.set('auth_token', data.token, { path: '/' });
                    setIsAuthenticated(true);
                } else {
                    setLoginError("Username or password is incorrect");
                }
            });
    };

    return (
        <>
            <h2 className="mb-3 text-2xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center text-gray-400">Dont have account?
                <a href="#" rel="noopener noreferrer" className="focus:underline hover:underline ml-1">Sign up here</a>
            </p>
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4 mb-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input type="text" {...register("username", { required: true })} id="username" placeholder="Enter username" className="w-full px-3 py-2 border rounded-md border-gray-700" data-temp-mail-org="2" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                        </div>
                        <input type="password" {...register("password", { required: true })} id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-700" />
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-blue-500 text-white">Sign in</button>
                {
                    loginError && <p className='text-red-500 text-sm mt-3'>{loginError}</p>
                }
            </form>
        </>
    );
};

export default Login;