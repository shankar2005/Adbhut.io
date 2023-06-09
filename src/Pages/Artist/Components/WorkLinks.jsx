import { useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Button from '../../../Components/Button/Button';

const WorkLinks = ({ workLinks, setWorkLinks, defaultWorkLinks }) => {
    const fileTypes = ["Youtube", "Google Drive", "Behance", "Imdb", "Instagram", "Vimeo", "Wixsite", "Other", "Other Document"];

    const handleInputChange = (index, event) => {
        const values = [...workLinks];
        values[index].weblink = event.target.value;
        setWorkLinks(values);
    };

    const handleTypeChange = (index, event) => {
        const values = [...workLinks];
        values[index].demo_type = event.target.value;
        setWorkLinks(values);
    };

    const handleAddField = () => {
        const values = [...workLinks];
        const lastFieldValue = values[values.length - 1].weblink;

        if (lastFieldValue !== '') {
            values.push({ weblink: '', demo_type: '' });
            setWorkLinks(values);
        }
    };

    const handleRemoveField = (index) => {
        const values = [...workLinks];
        values.splice(index, 1);
        setWorkLinks(values);
    };

    useEffect(() => {
        const formattedWorkLinks = defaultWorkLinks?.map(i => {
            return { weblink: i.weblink, demo_type: i.demo_type }
        });
        setWorkLinks(formattedWorkLinks || [{ weblink: '', demo_type: '' }]);
    }, [defaultWorkLinks])

    return (
        <div className='bg-gray-50 border-y p-4'>
            {workLinks?.map((field, index) => (
                <div key={index} className="mb-4 flex items-center gap-2">
                    <div className='w-full'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">{index === 0 ? 'Best work link' : `Work link ${index + 1}`}</label>
                        <input
                            type="text"
                            className="input"
                            value={field.weblink}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder={index === 0 ? 'Best work link' : `Work link ${index + 1}`}
                        />
                    </div>
                    <div className="w-3/6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Demo Type</label>
                        <select onChange={(event) => handleTypeChange(index, event)} className="input">
                            <option selected={!field.demo_type}>Choose</option>
                            {fileTypes.map(type => <option value={type} selected={field.demo_type === type}>{type}</option>)}
                        </select>
                    </div>
                    {workLinks.length > 1 && (
                        <button type="button" className="border self-end p-1" onClick={() => handleRemoveField(index)}><AiOutlineMinus size={30} /></button>
                    )}
                </div>
            ))}
            <button type="button" onClick={handleAddField} className="bg-gray-400 rounded px-2 py-1 text-sm text-white flex items-center gap-1">Add Work <AiOutlinePlus size={25} /></button>
        </div>
    );
};

export default WorkLinks;