import { BiFilterAlt } from 'react-icons/bi';
import Select from 'react-select';
import Input from '../../Components/Input/Input';

const FilterArtist = () => {
    return (
        <div className='bg-white rounded-b-lg shadow-sm relative'>
            <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm rounded-lg z-10 flex items-center justify-center text-xl font-bold font-hero'><span className='animate-vibrate'>Coming Soon!</span></div>
            <h1 className='p-4 border-b shadow-sm font-medium flex items-center gap-1'><BiFilterAlt className='text-blue-600' size={20} /> Filter</h1>
            <div className='p-4 space-y-4'>
                <Input
                    type="text"
                    name="category"
                    label="Category"
                    placeholder="e.g. Arkwork"
                />
                <Input
                    type="text"
                    name="location"
                    label="Location"
                    placeholder="e.g. Mumbai"
                />
                <div>
                    <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Skills</label>
                    <Select
                        isMulti
                        name="colors"
                        // options={allLanguages}
                        // inputRef={ref}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    // defaultValue={defaultValue}
                    />
                </div>

                <div className="col-span-2 flex items-center">
                    <input id="" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                    <label htmlFor="" className="ml-2 text-sm font-medium text-gray-900">Full Time</label>
                </div>
                <div className="col-span-2 flex items-center mb-4">
                    <input id="" type="checkbox" className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600" />
                    <label htmlFor="" className="ml-2 text-sm font-medium text-gray-900">Part Time</label>
                </div>
            </div>
        </div>
    );
};

export default FilterArtist;