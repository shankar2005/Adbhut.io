import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button/Button";
import { useAssignDemoToProjectMutation, useCreateDemoMutation } from "../../../features/demo/demoApi";
import { useRootContext } from '../../../contexts/RootProvider';

const AddDemoUrl = () => {
    const { contentProducts } = useRootContext();
    const [createDemo, { data: demo }] = useCreateDemoMutation();
    const [assignDemoToProject] = useAssignDemoToProjectMutation();
    const [contentProduct, setContentProduct] = useState(null);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        createDemo({
            "Title": data.title,
            "link": data.url,
            "comment": data.description
        })
    }

    // useEffect(() => {
    //     if (demo?.id) {
    //         setDemoSec(null);
    //         assignDemoToProject({
    //             id: projectId,
    //             data: { project_demos: [demo?.id] }
    //         })
    //     }
    // }, [demo?.id, projectId])

    return (
        <div className="px-4 py-8 relative">
            <h4 className='font-semibold text-lg'>Add a external file url for your demo</h4>
            <small>Choose the demo url you want to assign to your project. The demo can be a <strong>Google Drive (public), DropBox, OneDrive</strong> or any file sharing platform url or even your own work link.</small>
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-2">
                    <input {...register("title", { required: true })} type="text" className="input" placeholder="Title" />

                    <select onChange={(e) => {
                        const content = JSON.parse(e.target.value);
                        setContentProduct(content.pk);
                    }} className="input">
                        <option selected>Select content product</option>
                        {
                            contentProducts?.map(content => <option className="text-gray-900" value={JSON.stringify(content)}>{content.name}</option>)
                        }
                    </select>

                    <input {...register("url", { required: true })} type="url" className="input" placeholder="Demo url (Googe drive file link)" />
                    <textarea {...register("description")} rows="5" className="input" placeholder="Comment (optional)"></textarea>
                    <div className="flex justify-center"><Button type="submit">Upload</Button></div>
                </form>
            </div>
        </div>
    );
};

export default AddDemoUrl;