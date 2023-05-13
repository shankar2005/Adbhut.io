const Textarea = ({ name, label, placeholder, defaultValue, required, register, ...props }) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <textarea {...register(name, { required })} id={name} rows="5" className="input" placeholder={placeholder} defaultValue={defaultValue} {...props}></textarea>
        </div>
    );
};

export default Textarea;