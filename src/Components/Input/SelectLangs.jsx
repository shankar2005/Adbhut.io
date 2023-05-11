import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useGetLanguagesQuery } from '../../features/utils/utilsApi';

const SelectLangs = ({ control }) => {
    const { data: languages } = useGetLanguagesQuery();

    const allLanguages = [];
    languages?.forEach(language => {
        allLanguages.push({ value: language.pk, label: language.name })
    });

    return (
        <div className="mb-4">
            <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Select language</label>
            <Controller
                control={control}
                name='languages'
                id='language'
                render={({ field: { onChange, ref } }) => (
                    <Select
                        isMulti
                        name="colors"
                        options={allLanguages}
                        inputRef={ref}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                )}
            />
        </div>
    );
};

export default SelectLangs;