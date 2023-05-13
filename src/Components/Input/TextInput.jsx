const TextInput = ({ name, label, type, placeholder, value, required, register, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input {...register(name, { required })} type={type} id={name} className="input" placeholder={placeholder} defaultValue={value} {...props} />
        </div>
    );
};

export default TextInput;