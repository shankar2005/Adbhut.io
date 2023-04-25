import { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file submission logic here
  }

  console.log(file);

  return (
    <div className="max-w-md mx-auto mb-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        {file && (
          <div className="flex justify-center mt-4">
            <button type="submit" className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Upload File
            </button>
          </div>
        )}
      </form>
    </div>
  );
}


export default FileUpload;