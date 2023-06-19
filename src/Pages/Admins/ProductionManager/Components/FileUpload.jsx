import { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineSearch } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { useAssignArtistToDemoMutation, useCreateDemoMutation } from '../../../../features/demo/demoApi';
import { useGetArtistsQuery } from "../../../../features/artist/artistApi";
import Badge from '../../../../Components/Badge/Badge';

const FileUpload = ({ setShowUpload }) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(null);
  const [createDemo] = useCreateDemoMutation();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("Title", file?.name);
    formData.append("comment", desc);

    createDemo(formData)
      .then(data => {
        setFile(null);
        setShowUpload(null);
      })
  }

  return (
    <div className="max-w-md mx-auto mb-4">
      <div className="space-y-3">
        <input type="text" className="input" placeholder="Content Product / Demo category" />
        <div className="flex items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <AiOutlineCloudUpload size={40} className="mx-auto text-gray-400" />
            <span className="ml-2 text-sm leading-normal">{file?.name ? file.name : "Select a file"}</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {/* <textarea onBlur={(e) => setDesc(e.target.value)} rows="5" className="input" placeholder="Description (optional)"></textarea> */}

        {file && (
          <div className="flex justify-center mt-4">
            <button type="button" onClick={handleSubmit} className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Upload File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;