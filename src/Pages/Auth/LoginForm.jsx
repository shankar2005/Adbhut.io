import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { useRootContext } from '../../contexts/RootProvider';
import { useLoginUserMutation, useVerifyUserMutation } from '../../features/auth/authApi';
import { setLoading, setToken, setUser } from '../../features/auth/authSlice';
import { closeLogin } from '../../features/dropdown/dropdownSlice';

const LoginForm = () => {
    const { currentProjects } = useRootContext();
    const [loginUser, { data, isError, error }] = useLoginUserMutation();
    const [verifyUser, { data: userData }] = useVerifyUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        dispatch(setLoading(true));
        loginUser({
            email: data.email,
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
    }, [data])
    
    useEffect(() => {
        if (userData?.status === 'success') {
            dispatch(setUser(userData.user));
            dispatch(setLoading(false));
            // 
            if (currentProjects.length) {
                navigate(`/projects/${currentProjects[currentProjects.length - 1]?.pk}`)
            } else {
                navigate(`/projects/create-project`)
            }
            dispatch(closeLogin());
        }
    }, [userData, currentProjects])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mb-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm">Email</label>
                    <input type="text" {...register("email", { required: true })} id="email" placeholder="Enter email" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
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
                isError && <p className='text-red-500 text-sm mt-3'>{error.message}</p>
            }
        </form>
    );
};

export default LoginForm;