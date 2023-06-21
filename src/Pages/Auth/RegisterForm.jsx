import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import 'react-phone-input-2/lib/style.css'
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PI from "react-phone-input-2";
const PhoneInput = PI.default ? PI.default : PI;

const RegisterForm = () => {
    const [registerUser, { isSuccess, isError, error }] = useRegisterUserMutation();
    const [phone, setPhone] = useState(null);
    const [phoneNumberErr, setPhoneNumberErr] = useState(null);
    const [err, setErr] = useState(null);
    const phoneNumberRegex = /^9[0-9]{11}$/;
    const [showPassword, setShowPassword] = useState(false);

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required'),
        email: yup
            .string()
            .required('Email is required')
            .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                "Provide a valid email address"
            ),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long'),
        password2: yup
            .string()
            .required('Password is required')
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = data => {
        if (!phone || !phoneNumberRegex.test(phone)) {
            return setPhoneNumberErr("Please enter your valid phone number");
        } else {
            setPhoneNumberErr(null);
        }

        if (data.password !== data.password2) {
            return setErr("Password didn't match");
        } else {
            setErr(null);
        }

        registerUser({
            name: data.name,
            email: data.email,
            phone: "+" + phone,
            password: data.password,
            password2: data.password2,
            role: "Artist"
        })
    };

    useEffect(() => {
        if (isSuccess) {
            
            reset();
        }
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 mb-4">
                <div className="space-y-0.5">
                    <label htmlFor="name" className="block text-xs text-gray-600 font-semibold">Name</label>
                    <input type="text" {...register("name")} id="name" placeholder="Your name" className="input" />
                    {errors.name && <small className='text-red-400'>{errors.name?.message}</small>}
                </div>
                <div className="space-y-0.5">
                    <label htmlFor="email" className="block text-xs text-gray-600 font-semibold">Email</label>
                    <input type="text" {...register("email")} id="email" placeholder="Enter email" className={`input ${errors.email?.message && "!border-red-300 !ring-red-500"}`}
                    />
                    {errors.email && <small className='text-red-400'>{errors.email?.message}</small>}
                </div>
                <div className="space-y-0.5">
                    <label htmlFor="phone" className="block text-xs text-gray-600 font-semibold">Phone</label>
                    <PhoneInput
                        onlyCountries={['in']}
                        country={'in'}
                        value={phone}
                        onChange={ph => setPhone(ph)}
                        inputStyle={{ width: "100%", fontFamily: 'Source Sans Pro' }}
                        countryCodeEditable={false}
                    />
                    {phoneNumberErr && <small className='text-red-400'>{phoneNumberErr}</small>}
                </div>
                <div className="space-y-0.5 relative">
                    <label htmlFor="password" className="text-xs text-gray-600 font-semibold">Password</label>
                    <input type={showPassword ? "text" : "password"} {...register("password")} id="password" placeholder="Password" className="input" />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-gray-600">
                        {showPassword ? <BiHide size={20} /> : <BiShowAlt size={20} />}
                    </button>
                    {err && <small className='text-red-400'>{err}</small>}
                    {errors.password && <small className='text-red-400'>{errors.password.message}</small>}
                </div>
                <div className="space-y-0.5">
                    <label htmlFor="password2" className="text-xs text-gray-600 font-semibold">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} {...register("password2")} id="password2" placeholder="Confirm password" className="input" />
                    {err && <small className='text-red-400'>{err}</small>}
                </div>
            </div>
            {
                true
                    ? <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-blue-500 hover:bg-blue-600 active:scale-95 duration-150 text-white">Sign up</button>
                    : <button type="submit" disabled className="w-full px-8 py-3 font-medium rounded-md bg-gray-300 text-gray-400 cursor-not-allowed">Sign up</button>
            }

            {
                isError && <p className='text-red-500 text-sm mt-3'>{error?.data?.error}</p>
            }
        </form>
    );
};

export default RegisterForm;