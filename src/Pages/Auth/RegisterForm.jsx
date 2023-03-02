import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import Cookies from 'universal-cookie';
import { AuthContext } from '../../contexts/AuthProvider';

const RegisterForm = ({ formError, setformError }) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = formData => {
        setformError(null);
        const { username, password } = formData;

        fetch('https://dev.nsnco.in/api/v1/auth/register/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setformError(data.error);
                }
                if (data.success) {
                    fetch('https://dev.nsnco.in/api/v1/auth/login/', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({ username, password })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.token) {
                                const cookies = new Cookies();
                                cookies.set('auth_token', data.token, { path: '/' });
                                setIsAuthenticated(true);
                            } else {
                                setformError("Something went wrong!");
                            }
                        });
                }
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 mb-4">
                <div className="space-y-1">
                    <label htmlFor="username" className="block text-sm">Username</label>
                    <input type="text" {...register("username", { required: true })} id="username" placeholder="Enter username" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm">Email</label>
                    <input type="email" {...register("email", { required: true })} id="email" placeholder="Enter your email" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <input type="password" {...register("password", { required: true })} id="password" placeholder="*****" className="w-full p-3 border rounded-md border-gray-700" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="password2" className="text-sm">Confirm Password</label>
                    <input type="password" {...register("password2", { required: true })} id="password2" placeholder="*****" className="w-full p-3 border rounded-md border-gray-700" />
                </div>
            </div>
            <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white">Sign up</button>
            {
                formError && <p className='text-red-500 text-sm mt-3'>{formError}</p>
            }
        </form>
    );
};

export default RegisterForm;