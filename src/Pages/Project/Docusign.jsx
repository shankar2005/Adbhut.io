import React, { useContext } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { AuthContext } from '../../contexts/AuthProvider';

const Docusign = () => {
    const { user: { name, email } } = useContext(AuthContext);

    return (
        <div className='bg-white p-4 rounded-lg shadow-md border'>
            <div>
                <img className='w-40 mx-auto' src="https://res.cloudinary.com/softwarepundit/image/upload/c_limit,dpr_1.0,f_auto,h_1600,q_auto,w_1600/v1/software/docusign-logo" alt="" />
            </div>
            <div className="mb-4 items-center gap-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" disabled defaultValue={name} />
            </div>
            <div className="mb-4 items-center gap-2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                {
                    email
                        ? <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" disabled defaultValue={email || "N/A"} />
                        : <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="example@gmail.com" />
                }
            </div>
            <Link to="/projects/completed">
            <button type="submit" className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center gap-2">Proceed to Signing <BsBoxArrowUpRight size="20" /></button>
            </Link>
        </div>
    );
};

export default Docusign;