const Input = ({ name, label, type, placeholder, defaultValue, required, register, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input {...register(name, { required: !defaultValue })} type={type} id={name} className="input" placeholder={placeholder} defaultValue={defaultValue} {...props} />
        </div>
    );
};

export default Input;