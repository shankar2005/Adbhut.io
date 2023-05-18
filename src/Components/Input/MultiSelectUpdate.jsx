import { Controller } from 'react-hook-form';
import Select from 'react-select';

const MultiSelectUpdate = ({ name, label, control, options, defaultValue }) => {
    if (!defaultValue) return;
    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <Controller
                control={control}
                name={name}
                id={name}
                render={({ field: { onChange, ref } }) => (
                    <Select
                        isMulti
                        name={name}
                        options={options}
                        inputRef={ref}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        defaultValue={defaultValue}
                    />
                )}
            />
        </div>
    );
};

export default MultiSelectUpdate;