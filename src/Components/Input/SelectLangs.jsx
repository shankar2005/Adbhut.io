import { useEffect } from 'react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useGetLanguagesQuery } from '../../features/utils/utilsApi';

const SelectLangs = ({ control, defaultValue }) => {
    const { data: languages } = useGetLanguagesQuery();

    const allLanguages = languages?.map(language => {
        return { value: language.pk, label: language.name }
    });

    if (!defaultValue) {
        return;
    }

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
                        defaultValue={defaultValue}
                    />
                )}
            />
        </div>
    );
};

export default SelectLangs;