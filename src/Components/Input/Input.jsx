const Input = ({
    name,
    label,
    type,
    placeholder,
    defaultValue,
    required,
    register = () => { },
    className = "",
    ...props
}) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900">{label}</label>
            <input
                {...register(name, { required })}
                type={type}
                id={name}
                className={`input ${className}`}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...props}
            />
        </div>
    );
};

export default Input;