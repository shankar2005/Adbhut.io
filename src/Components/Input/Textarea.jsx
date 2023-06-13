const Textarea = ({ name, placeholder, defaultValue, required, register, ...props }) => {
    return (
        <div>
            <textarea {...register(name, { required })} id={name} rows="5" className="input" placeholder={placeholder} defaultValue={defaultValue} {...props}></textarea>
        </div>
    );
};

export default Textarea;