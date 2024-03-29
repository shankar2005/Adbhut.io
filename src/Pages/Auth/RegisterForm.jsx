import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../features/auth/authApi";
import 'react-phone-input-2/lib/style.css'
import { useState } from "react";
import { BiArrowBack, BiHide, BiShowAlt } from "react-icons/bi";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PI from "react-phone-input-2";
import Badge from "../../Components/Badge/Badge";
const PhoneInput = PI.default ? PI.default : PI;

const RegisterForm = ({ role, setRole }) => {
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

        const formData = {
            name: data.name,
            email: data.email,
            phone: "+" + phone,
            password: data.password,
            password2: data.password2,
            role: role
        };


        if (role === "Client") {
            formData.company = data.company;
            formData.url = data.url;
        }
        registerUser(formData);
    };

    useEffect(() => {
        if (isSuccess || role) {
            reset();
        }
    }, [isSuccess, role]);

    if (!role) {
        return (
            <div className="flex justify-center mt-5 gap-3 py-5">
                <button onClick={() => setRole("Client")} type="button" className="border-2 hover:border-blue-500 rounded-lg py-10 w-full text-center font-semibold duration-150">Join as a Client</button>
                <button onClick={() => setRole("Artist")} type="button" className="border-2 hover:border-blue-500 rounded-lg py-10 w-full text-center font-semibold duration-150">Join as an Artist</button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 mb-4">
                {isSuccess && <Badge type="success" className="block w-full py-2 border border-green-200 mb-3 rounded text-sm">Registration Successful! Please check your email and verify your account to activate it.</Badge>}
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
                {role === "Client" && (
                    <>
                        <div className="space-y-0.5">
                            <label htmlFor="company" className="block text-xs text-gray-600 font-semibold">Company</label>
                            <input type="text" {...register("company", { required: "Company name is required" })} id="company" placeholder="Company name" className="input" />
                            {errors.company && <small className='text-red-400'>{errors.company?.message}</small>}
                        </div>
                        <div className="space-y-0.5">
                            <label htmlFor="url" className="block text-xs text-gray-600 font-semibold">Company Website</label>
                            <input type="url" {...register("url", { required: "Company website is required" })} id="url" placeholder="Company portfolio" className="input" />
                            {errors.name && <small className='text-red-400'>{errors.name?.message}</small>}
                        </div>
                    </>
                )}
                <div className="space-y-0.5">
                    <label htmlFor="password" className="text-xs text-gray-600 font-semibold">Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} {...register("password")} id="password" placeholder="Password" className="input" />
                        <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute top-1/2 right-0 -translate-x-2 -translate-y-1/2 text-gray-600">
                            {showPassword ? <BiHide size={20} /> : <BiShowAlt size={20} />}
                        </button>
                    </div>
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

            <button onClick={() => setRole(null)} type="button" className="absolute top-0 left-0 ml-3 mt-4"><BiArrowBack size={20} /></button>
        </form>
    );
};

export default RegisterForm;