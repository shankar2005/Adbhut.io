import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useRegisterUserMutation } from "../../features/auth/authApi";

const RegisterForm = () => {
    const [registerUser, { isSuccess, isError, error }] = useRegisterUserMutation();

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        registerUser({
            email: data.email,
            password: data.password,
            password2: data.password2,
            company: data.company,
            url: data.url,
            phone: data.phone,
            name: data.name
        })
    };

    useEffect(() => {
        if (isSuccess) {
            Swal.fire(
                'Congratulations!',
                'User has been created successfully!',
                'success'
            )
            reset();
        }
    }, [isSuccess])

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
                    <label htmlFor="url" className="block text-sm">Company Website</label>
                    <input type="url" {...register("url", { required: true })} id="url" placeholder="microsoft.com" className="w-full p-3 border rounded-md border-gray-700" data-temp-mail-org="2" />
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