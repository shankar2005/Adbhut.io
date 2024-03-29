import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FcDeleteDatabase } from "react-icons/fc";
import Badge from "../../../Components/Badge/Badge";
import { useCreateWrokLinkMutation, useDeleteWrokLinkMutation, useGetArtistWrokLinksQuery, useUpdateWrokLinkMutation } from "../../../features/artist/artistApi";
import ActionLoader from "../../../Components/Loader/ActionLoader";

const WorkLinkTable = ({ artistId }) => {
    const { data } = useGetArtistWrokLinksQuery(artistId, { skip: !artistId });
    const works_links = data?.works_links;
    const [editingId, setEditingId] = useState(null);
    const editingLink = works_links?.find(l => l.pk === editingId);
    const [tags, setTags] = useState([]);
    const linkRef = useRef();
    const [isBestWork, setIsBestWork] = useState();
    const [isDemo, setIsDemo] = useState();
    const [updateWorkLink] = useUpdateWrokLinkMutation();
    const [deleteWorkLink, { isLoading: deleteLoading }] = useDeleteWrokLinkMutation();

    const handleRowClick = (id) => {
        setEditingId(id);
    };

    const handleCloseInput = () => {
        setEditingId(null);
    };

    useEffect(() => {
        if (editingId) {
            setTags(editingLink?.tags);
            setIsBestWork(editingLink?.show_in_top_feed);
            setIsDemo(editingLink?.is_demo);
        }
    }, [editingId, editingLink?.tags])

    const handleSave = () => {
        updateWorkLink({
            id: editingId,
            data: {
                weblink: linkRef.current?.value,
                tags,
                show_in_top_feed: isBestWork,
                is_demo: isDemo
            }
        }).then(data => {
            if (data?.data?.id) {
                setEditingId(null);
            }
        })
    }

    return (
        <div className="w-full overflow-x-auto font-hero">
            <table className="w-full">
                <thead>
                    <tr className="text-md text-left text-gray-900 bg-gray-100 text-sm">
                        {/* <th className="p-2 border font-semibold">Type</th> */}
                        <th className="p-2 border font-semibold">Link</th>
                        <th className="p-2 border font-semibold">Keywords</th>
                        <th className="p-2 border font-semibold">Status</th>
                        <th className="p-2 border font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {works_links?.map(link => (
                        <tr key={link.pk}>
                            {/* <td className="p-2 text-sm border whitespace-nowrap">
                                {editingId === link.pk ? (
                                    <select name="" className="border rounded">
                                        <option value={link.demo_type}>{link.demo_type}</option>
                                    </select>
                                ) : (
                                    link.demo_type
                                )}
                            </td> */}
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
                            <td className="p-2 text-sm border space-y-1">
                                {editingId === link.pk ? (
                                    <>
                                        <div class="flex items-center">
                                            <input onChange={() => setIsBestWork(prev => !prev)} id={`best-work-checkbox-edit-${link.pk}`} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={isBestWork} />
                                            <label for={`best-work-checkbox-edit-${link.pk}`} class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input onChange={() => setIsDemo(prev => !prev)} id="demo-checkbox-edit" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={isDemo} />
                                            <label for="demo-checkbox-edit" class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div class="flex items-center">
                                            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={link.show_in_top_feed} disabled />
                                            <label class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" checked={link.is_demo} disabled />
                                            <label class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                                        </div>
                                    </>
                                )}

                            </td>
                            <td className="p-2 text-sm border">
                                {editingId === link.pk ? (
                                    <div className="flex gap-1">
                                        <Badge onClick={handleSave} className="cursor-pointer" type="success">Save</Badge>
                                        {deleteLoading ? <ActionLoader size="sm" /> : <Badge onClick={() => deleteWorkLink(link.pk)} className="cursor-pointer" type="error">Del</Badge>}
                                        <RxCross2 onClick={handleCloseInput} size={25} className="text-gray-700 cursor-pointer" />
                                    </div>
                                ) : (
                                    <Badge className="cursor-pointer" type="error" onClick={() => handleRowClick(link.pk)}>Edit</Badge>
                                )}
                            </td>
                        </tr>
                    ))}

                    <AddWorkLink artistId={artistId} />

                </tbody>
            </table >
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
                    {tags?.map((tag, index) => (
                        <li
                            key={index}
                            className="flex items-center bg-gray-200 text-gray-700 rounded-full px-2 py-1 m-0.5 text-xs"
                        >
                            {tag}
                            <button
                                type="button"
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

// 

const AddWorkLink = ({ artistId }) => {
    const [tags, setTags] = useState([]);
    const linkRef = useRef();
    const bestWorkRef = useRef();
    const demoRef = useRef();
    const handleCloseInput = () => { }
    const fileTypes = ["Youtube", "Google Drive", "Behance", "Imdb", "Instagram", "Vimeo", "Wixsite", "Other", "Other Document"];
    const [createWrokLink, { isSuccess }] = useCreateWrokLinkMutation();

    const handleSave = () => {
        if (!linkRef.current?.value) {
            linkRef.current?.focus();
            return;
        }
        createWrokLink({
            id: artistId,
            data: {
                weblink: linkRef.current?.value,
                tags,
                show_in_top_feed: bestWorkRef.current?.checked,
                is_demo: demoRef.current?.checked
            }
        })
    }

    useEffect(() => {
        if (isSuccess) {
            setTags([]);
        }
    }, [isSuccess])

    return (
        <tr>
            {/* <td className="p-2 text-sm border space-y-1">
                <select name="" className="border rounded">
                    <option value="">Select type</option>
                    {fileTypes.map(type => <option value={type}>{type}</option>)}
                </select>
            </td> */}
            <td className="p-2 text-sm border">
                <input
                    type="text"
                    className="w-full border rounded pl-1"
                    placeholder="Work link"
                    ref={linkRef}
                />
            </td>
            <td className="p-2 text-sm border">
                <KeywordInput tags={tags} setTags={setTags} />
            </td>
            <td className="p-2 text-sm border space-y-1">
                <div class="flex items-center">
                    <input ref={bestWorkRef} id="best-work-checkbox-create" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label for="best-work-checkbox-create" class="ml-2 text-sm font-medium text-gray-900">Best Work</label>
                </div>
                <div class="flex items-center">
                    <input ref={demoRef} id="demo-checkbox-create" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label for="demo-checkbox-create" class="ml-2 text-sm font-medium text-gray-900">Customizable</label>
                </div>
            </td>
            <td className="p-2 text-sm border">
                <div className="flex gap-1">
                    <Badge onClick={handleSave} className="cursor-pointer" type="success">Add</Badge>
                    <RxCross2 onClick={handleCloseInput} size={25} className="text-gray-700 cursor-pointer" />
                </div>
            </td>
        </tr>
    )
}