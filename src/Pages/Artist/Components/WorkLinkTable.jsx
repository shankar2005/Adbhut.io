import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Badge from "../../../Components/Badge/Badge";
import { useUpdateWrokLinkMutation } from "../../../features/artist/artistApi";

const WorkLinkTable = ({ works_links }) => {
    const [editingId, setEditingId] = useState(null);
    const editingLink = works_links.find(l => l.pk === editingId);
    const [tags, setTags] = useState([]);
    const linkRef = useRef();
    const [updateWorkLink] = useUpdateWrokLinkMutation();

    const handleRowClick = (id) => {
        setEditingId(id);
    };

    const handleCloseInput = () => {
        setEditingId(null);
    };

    useEffect(() => {
        if (editingId) {
            setTags(editingLink?.tags);
        }
    }, [editingId, editingLink?.tags])

    const handleSave = () => {
        updateWorkLink({
            id: editingId,
            data: {
                weblink: linkRef.current?.value,
                tags
            }
        }).then(data => {
            if (data?.data?.message === "Updated successfully") {
                setEditingId(null);
            }
        })
    }

    return (
        <div className="w-full overflow-x-auto font-hero mt-5">
            <table className="w-full">
                <thead>
                    <tr className="text-md text-left text-gray-900 bg-gray-100 text-sm">
                        <th className="p-2 border font-semibold">Type</th>
                        <th className="p-2 border font-semibold">Link</th>
                        <th className="p-2 border font-semibold">Keywords</th>
                        <th className="p-2 border font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {works_links?.map(link => (
                        <tr key={link.pk}>
                            <td className="p-2 text-sm border whitespace-nowrap">
                                {editingId === link.pk ? (
                                    <select name="" className="border rounded">
                                        <option value={link.demo_type}>{link.demo_type}</option>
                                    </select>
                                ) : (
                                    link.demo_type
                                )}

                            </td>
                            <td className="p-2 text-sm border">
                                {editingId === link.pk ? (
                                    <input
                                        type="text"
                                        className="w-full border rounded pl-1"
                                        defaultValue={link.weblink}
                                        ref={linkRef}
                                    />
                                ) : (
                                    <a target="_blank" href={link.weblink} className="text-blue-700 hover:underline">{link.weblink}</a>
                                )}
                            </td>
                            <td className="p-2 text-sm border">
                                {editingId === link.pk ? (
                                    <KeywordInput tags={tags} setTags={setTags} />
                                ) : (
                                    <div className="flex flex-wrap gap-1">
                                        {link.tags?.map(keyword => <span className="flex items-center bg-gray-200 rounded-full px-2 py-1 text-xs">{keyword}</span>)}
                                    </div>
                                )}

                            </td>
                            <td className="p-2 text-sm border">
                                <div>
                                    {editingId === link.pk ? (
                                        <div className="flex gap-1">
                                            <Badge onClick={handleSave} className="cursor-pointer" type="success">Save</Badge>
                                            <RxCross2 onClick={handleCloseInput} size={25} className="text-gray-700 cursor-pointer" />
                                        </div>
                                    ) : (
                                        <Badge className="cursor-pointer" type="error" onClick={() => handleRowClick(link.pk)}>Edit</Badge>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkLinkTable;

// 

const KeywordInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            event.preventDefault();
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeTag = (index) => {
        setTags((prevTags) =>
            prevTags.filter((_, i) => i !== index)
        );
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <ul className="flex flex-wrap border border-gray-300 rounded max-h-52 overflow-auto">
                    {tags.map((tag, index) => (
                        <li
                            key={index}
                            className="flex items-center bg-gray-200 text-gray-700 rounded-full px-2 py-1 m-0.5 text-xs"
                        >
                            {tag}
                            <button
                                className="ml-2 text-gray-500 focus:outline-none"
                                onClick={() => removeTag(index)}
                            >
                                &times;
                            </button>
                        </li>
                    ))}
                    <li className="flex-grow">
                        <input
                            type="text"
                            className="w-full px-2 py-1 bg-transparent focus:outline-none"
                            placeholder="Add tags"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                        />
                    </li>
                </ul>
            </div>
            <small className="mt-2 text-gray-500">
                Press Enter to add a tag
            </small>
        </div>
    )
}