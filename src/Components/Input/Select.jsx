const Select = ({ name, label, register = () => { }, required, defaultValue, defaultOption, options }) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <select {...register(name, { required: required || !defaultValue })} id={name} className="input">
                <option value="" selected={true} disabled>{defaultOption}</option>
                {options?.map(option => (
                    <option value={option.pk} selected={defaultValue}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;