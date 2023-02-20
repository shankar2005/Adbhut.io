import React from 'react';

const ProjectDone = () => {
    // const {} = RootPro

    return (
        <div className='bg-white rounded-lg shadow-md border'>
            <div className='p-4'>
                <img className='w-40 mx-auto' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png" alt="" />
                <h1 className='text-3xl font-bold text-center mt-3'>Project Completed</h1>
            </div>
            <div className='p-4 mt-3 border-t border-gray-300'>
                <h1 className='text-xl font-medium text-center'>Project Overview</h1>
                <p></p>
            </div>
        </div>
    );
};

export default ProjectDone;