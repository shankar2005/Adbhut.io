const Select = ({ name, register = () => { }, required, defaultValue, defaultOption, options }) => {
    return (
        <select {...register(name, { required })} id={name} className="text-sm border rounded">
            {defaultOption && <option value="" selected>{defaultOption}</option>}
            {options?.map(option => (
                <option value={option.pk} selected={defaultValue === option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default Select;