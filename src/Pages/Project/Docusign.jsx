import React, { useContext } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Docusign = () => {
    const { user: { name, email } } = useSelector(state => state.auth);

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
                <Button>Proceed to Signing <BsBoxArrowUpRight size="20" /></Button>
            </Link>
        </div>
    );
};

export default Docusign;