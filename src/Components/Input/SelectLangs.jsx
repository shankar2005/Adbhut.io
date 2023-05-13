import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useGetLanguagesQuery } from '../../features/utils/utilsApi';

const SelectLangs = ({ control, defaultValue }) => {
    const { data: languages } = useGetLanguagesQuery();

    const allLanguages = languages?.map(language => {
        return { value: language.pk, label: language.name }
    });

    const defaultLanguages = languages?.filter(lang => defaultValue?.find(lang2 => lang2 === lang.name));
    const formattedDefaultLanguages = defaultLanguages?.map(lang => {
        return { value: lang.pk, label: lang.name }
    })
    console.log(formattedDefaultLanguages);

    return (
        <div>
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
                        defaultValue={formattedDefaultLanguages}
                    />
                )}
            />
        </div>
    );
};

export default SelectLangs;