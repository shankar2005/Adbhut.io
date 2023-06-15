const Input = ({
    name,
    type,
    placeholder,
    defaultValue,
    required,
    register = () => { },
    className,
    ...props
}) => {
    return (
        <input
            {...register(name, { required })}
            type={type}
            className={`border px-1 outline-none ${className && className}`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...props}
        />
    );
};

export default Input;