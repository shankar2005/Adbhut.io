import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import { AuthContext } from '../../contexts/AuthProvider';

const LoginForm = ({ formError, setformError }) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        setformError(null);
        fetch('https://dev.nsnco.in/api/v1/auth/login/', {
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
                    setformError("Username or password is incorrect");
                }
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mb-4">
                <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm">Username</label>
                    <input type="text" {...register("username", { required: true })} id="username" placeholder="Enter username" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                    </div>
                    <input type="password" {...register("password", { required: true })} id="password" placeholder="*****" className="w-full p-3 border rounded-md border-gray-700" />
                </div>
            </div>
            <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white">Sign in</button>
            {
                formError && <p className='text-red-500 text-sm mt-3'>{formError}</p>
            }
        </form>
    );
};

export default LoginForm;