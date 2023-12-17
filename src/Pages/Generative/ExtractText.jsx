import { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { useExtractTextMutation } from "../../features/generative/generativeApi";

const ExtractText = () => {
    const [fileURL, setFileURL] = useState(null);
    const [extractText, { data, isLoading, isSuccess }] = useExtractTextMutation();

    const handleFileChange = (e) => {
        setFileURL(URL.createObjectURL(e.target.files[0]));

        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        // Api logic
        extractText(formData);
    }

    return (
        <>
            <main className="max-w-screen-md mx-auto pb-10">
                <div className="text-center py-10">
                    <h1 className="text-4xl font-bold mb-3">Image To Text</h1>
                    <small className="text-sm">Turn picture into text with our image to text extractor tool. Simply upload your photos <br className="hidden lg:block" /> and extract text from image with a single click.</small>
                </div>
                <div className="p-3 shadow-2xl rounded">
                    <div className="flex items-center justify-center border-2 border-sky-900 border-dashed rounded min-h-[9rem] py-8">
                        <label htmlFor="file-upload" className="relative cursor-pointer w-full h-full flex items-center justify-center">
                            <div className="text-center flex flex-col items-center">
                                <GrGallery size={30} className="mx-auto mb-2" />
                                <span className="font-medium text-xl text-gray-400 ">Upload or drag and <br /> drop a picture.</span>
                                <button className='bg-blue-500 w-fit px-5 py-1 rounded-lg text-white shadow-sm mt-4'>Browse</button>
                            </div>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>
                {fileURL && (
                    <div className="bg-gray-900 mt-20 h-[400px] relative">
                        {isLoading ? (
                            <div className="bg-gray-200 absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2">
                                <span className="animate-pulse text-gray-600">Analysing ... </span>
                                <div className="w-10 h-10 border-8 border-gray-500 rounded-full border-dashed animate-spin"></div>
                            </div>
                        ) : (
                            isSuccess && <img className="w-full h-full object-contain mx-auto" src={fileURL} alt="" />
                        )}
                    </div>
                )}
                <div className="mt-10 bg-gray-50 p-5 border rounded">
                    <h5 className="bg-gray-200 px-4 py-2 rounded font-semibold mb-4">Keywords:</h5>
                    <div className="flex flex-wrap gap-y-2 gap-x-1">{data?.texts?.map(keyword => <span className="px-3 py-1 bg-white border text-sm rounded-full shadow-sm w-fit select-all">{keyword}</span>)}</div>
                </div>
            </main>
        </>
    );
};

export default ExtractText;