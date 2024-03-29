import { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setReferenceLinks, setReferenceLinksHasTaken } from "../../../features/project/projectSlice";

const GetProjectReference = ({ setShowProjectReferenceLinkInput }) => {
    const [fields, setFields] = useState(['']);
    const [showInputs, setShowInputs] = useState(false);

    const handleAddField = () => {
        if (!fields[fields.length - 1].length) return;
        setFields([...fields, '']);
    };

    const handleRemoveFields = (index) => {
        if (index === 0) return;
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleChange = (index, event) => {
        const newFields = [...fields];
        newFields[index] = event.target.value;
        setFields(newFields);
    };

    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(setReferenceLinks(fields));
        setShowProjectReferenceLinkInput(false);
    }

    return (
        <>
            Do you have any project reference links?
            <div className='space-x-1.5 mt-1 text-black'>
                <button onClick={() => setShowInputs(true)} className='bg-white py-1.5 px-3 rounded-md'>Yes</button>
                <button onClick={() => {
                    setShowProjectReferenceLinkInput(false);
                    dispatch(setReferenceLinksHasTaken());
                }} className='bg-white py-1.5 px-3 rounded-md'>No</button>
            </div>
            {
                showInputs &&
                <div className="mt-2 space-y-2">
                    {fields.map((field, index) => (
                        <div className="flex items-center gap-1 text-black">
                            <input
                                key={index}
                                value={field}
                                onChange={(event) => handleChange(index, event)}
                                className="w-full p-1.5 rounded-md"
                                placeholder="Project Ref Link"
                            />
                            <button className="bg-white p-1.5 rounded-md text-red-600" onClick={() => handleRemoveFields(index)}><FiTrash size={18} /></button>
                            <button className="bg-white p-1.5 rounded-md text-black" onClick={handleAddField}><FiPlus size={18} /></button>
                        </div>
                    ))}
                    <button onClick={handleSubmit} className='bg-white py-1.5 px-3 rounded-md text-black'>Submit</button>
                </div>
            }
        </>
    );
};

export default GetProjectReference;