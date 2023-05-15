import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useRootContext } from '../../contexts/RootProvider';

const SelectSkills = ({ control, defaultValue }) => {
    const { skills } = useRootContext();
    const allSkills = [];
    skills.forEach(skill => {
        allSkills.push({ value: skill.pk, label: skill.name })
    });

    if (!defaultValue) {
        return;
    }

    return (
        <div>
            <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-900">Select skill</label>
            <Controller
                control={control}
                name='skill'
                id='skill'
                render={({ field: { onChange, ref } }) => (
                    <Select
                        isMulti
                        name="colors"
                        options={allSkills}
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

export default SelectSkills;