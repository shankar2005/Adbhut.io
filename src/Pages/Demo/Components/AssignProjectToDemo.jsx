import { AiOutlineSearch } from 'react-icons/ai';
import Badge from '../../../Components/Badge/Badge';
import { useGetCurrentProjectsQuery } from '../../../features/project/projectApi';

const AssignProjectToDemo = () => {
    const { data: projects } = useGetCurrentProjectsQuery();

    return (
        <div className="px-4 py-8 relative">
            <h4 className='font-semibold text-lg'>Assign project to this demo</h4>
            <small>Choose the demo you want to link to your project. The demo you've choosen can be modified according your needs. It's just an template to give you the idea.</small>
            <div className="mt-10">
                <div className="flex justify-between items-center mb-5 gap-5 px-3">
                    <h5 className="text-xl font-bold border-b flex-grow pb-1">Projects</h5>
                    <form className="flex relative">
                        <input type="search" name="search" className='border border-gray-300 py-2 w-60 pl-10 pr-3 outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded' placeholder='Search your artist here...' required />
                        <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                    </form>
                </div>
                <ul>
                    {
                        projects?.map(project => <li className="hover:bg-gray-200 px-3 py-2 border-b flex justify-between">
                            {project.title}
                            <Badge type="success" className="border border-green-200 cursor-pointer text-sm font-normal">Assign</Badge>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default AssignProjectToDemo;