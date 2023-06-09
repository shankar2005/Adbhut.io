import { Controller } from 'react-hook-form';
import Select from 'react-select';

const MultiSelect = ({ name, control, options }) => {
    return (
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
                />
            )}
        />
    );
};

export default MultiSelect;