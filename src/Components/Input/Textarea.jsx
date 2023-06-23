const Textarea = ({ name, placeholder, defaultValue, required, register, ...props }) => {
    return (
        <textarea
            {...register(name, { required })}
            id={name}
            rows="5"
            className="input"
            placeholder={placeholder}
            defaultValue={defaultValue}
            {...props}
        ></textarea>
    );
};

export default Textarea;