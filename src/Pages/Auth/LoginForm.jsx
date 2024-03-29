import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { useLoginUserMutation, useVerifyUserMutation } from '../../features/auth/authApi';
import { setLoading, setToken, setUser } from '../../features/auth/authSlice';
import { closeLogin } from '../../features/dropdown/dropdownSlice';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useState } from 'react';
import { useRootContext } from '../../contexts/RootProvider';
import Badge from '../../Components/Badge/Badge';

const LoginForm = () => {
    const [loginUser, { data, isError, error, isLoading }] = useLoginUserMutation();
    const [verifyUser, { data: userData }] = useVerifyUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const { currentProjects } = useRootContext();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        dispatch(setLoading(true));
        loginUser({
            email: data.email.trim(),
            password: data.password
        });
    };

    useEffect(() => {
        if (data?.token) {
            verifyUser({ token: data.token });
            // storing token inside cookies
            const cookies = new Cookies();
            cookies.set('auth_token', data.token, { path: '/' });
            dispatch(setToken(data.token));
        }
    }, [data]);

    useEffect(() => {
        if (userData?.status === 'success') {
            dispatch(setUser(userData.user));
            dispatch(setLoading(false));
            dispatch(closeLogin());
            if (location.pathname.includes("/create-project")) {
                return navigate("/projects/create-project")
            }
            switch (userData.user?.role) {
                case "PM":
                    navigate("/projects");
                    break;
                case "AM":
                    navigate("/projects/artist-requirement");
                    break;
                case "Artist":
                    navigate("/artists/demos");
                    break;
                case "Client":
                    if (currentProjects?.length) {
                        navigate("/projects");
                    } else {
                        navigate("/projects/readydemos");
                    }
                    break;
                default:
                    navigate("/projects/readydemos");
                    break;
            }
        }
    }, [userData]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-16">
            <div className="space-y-4 mb-4">
                {
                    data?.length > 0 && data[0].toLowerCase().includes("verify") &&
                    <Badge type="warning" className="block w-full py-2 border border-yellow-200 mb-3 rounded text-sm">{data[0]}</Badge>
                }
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm">Email</label>
                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Provide a valid email address"
                            }
                        })}
                        id="email"
                        placeholder="Enter email"
                        className={`input ${errors.email?.message && "!border-red-500 !ring-red-500"}`}
                    />
                    {errors.email?.message && <small className='text-red-400'>{errors.email?.message}</small>}
                </div>
                <div className="space-y-2 relative">
                    <div className="flex justify-between">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400">Forgot password?</a>
                    </div>
                    <input type={showPassword ? "text" : "password"} {...register("password", { required: true })} id="password" placeholder="*****" className="input" />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 text-gray-600">
                        {showPassword ? <BiHide size={20} /> : <BiShowAlt size={20} />}
                    </button>
                </div>
            </div>
            {
                isLoading
                    ? <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-gray-300 text-gray-400 animate-pulse" disabled>Loading...</button>
                    : <button type="submit" className="w-full px-8 py-3 font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white">Sign in</button>
            }
            {isError && <p className='bg-red-100 text-red-500 text-sm p-3 mt-3'>{error?.data?.error || "server_error::SOMETHING_WENT_WRONG"}</p>}
        </form>
    );
};

export default LoginForm;