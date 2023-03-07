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
                    <label htmlFor="name" className="block text-sm">Full Name</label>
                    <input type="text" {...register("name", { required: true })} id="name" placeholder="John Doe" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm">Email</label>
                    <input type="email" {...register("email", { required: true })} id="email" placeholder="john@example.com" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm">Phone</label>
                    <input type="phone" {...register("phone", { required: true })} id="phone" placeholder="+12 1623 1523" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="company" className="block text-sm">Company</label>
                    <input type="company" {...register("company", { required: true })} id="company" placeholder="Microsoft" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
                </div>
                <div className="space-y-1">
                    <label htmlFor="companyURL" className="block text-sm">Company Website</label>
                    <input type="companyURL" {...register("companyURL", { required: true })} id="companyURL" placeholder="microsoft.com" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
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