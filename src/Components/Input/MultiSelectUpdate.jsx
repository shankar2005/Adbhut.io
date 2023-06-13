import { Controller } from 'react-hook-form';
import Select from 'react-select';

const MultiSelectUpdate = ({ name, control, options, defaultValue }) => {
    if (!defaultValue) return;
    return (
        <div>
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