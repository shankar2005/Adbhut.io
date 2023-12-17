import { BsStars } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdImage } from "react-icons/io";
import { IoArrowBack, IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GrGallery } from "react-icons/gr";

const ExtractText = () => {
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileURL(URL.createObjectURL(e.target.files[0]));
    }


    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append("document", file);

        // Api logic
    }

    const data = {
        "texts": [
            "GLOBAL AGE",
            "Score 7+ in",
            "IELTS",
            "Listening",
            "Reading",
            "Speaking",
            "Writing",
            "FIRST FREE CLASS",
            "16 5 JANUARY PM",
            "0321 1114509",
            "f",
            "Global Age Islamabad",
            "0321 1112541",
            "GLOBAL",
            "AGE",
            "Score",
            "7+",
            "in",
            "IELTS",
            "Listening",
            "Reading",
            "Speaking",
            "Writing",
            "FIRST",
            "FREE",
            "CLASS",
            "16",
            "5",
            "JANUARY",
            "PM",
            "0321",
            "1114509",
            "f",
            "Global",
            "Age",
            "Islamabad",
            "0321",
            "1112541"
        ]
    };

    return (
        <>
            <main className="max-w-screen-md mx-auto pb-10">
                <div className="text-center py-10">
                    <h1 className="text-4xl font-bold mb-3">Image To Text</h1>
                    <small className="text-sm">Turn picture into text with our image to text extractor tool. Simply upload your photos <br /> and extract text from image with a single click.</small>
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
                {file?.name && (
                    <div className="bg-gray-900 mt-20 h-[400px]">
                        <img className="w-full h-full object-contain mx-auto" src={fileURL} alt="" />
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