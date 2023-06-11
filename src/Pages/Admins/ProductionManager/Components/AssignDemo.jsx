import { AiOutlineSearch } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

const AssignDemo = ({ setDemoSec }) => {
    return (
        <div className="px-4 py-8 relative">
            <RxCross1 onClick={() => setDemoSec(null)} size={20} className="absolute top-0 right-0 m-4 cursor-pointer" />
            <h4 className='font-semibold text-lg'>Import an pre existing demo of an artist</h4>
            <small>Choose the demo you want to link to your project. The demo you've choosen can be modified according your needs. It's just an template to give you the idea.</small>
            <div className="mt-10">
                <div className="flex justify-between items-center mb-5 gap-5 px-3">
                    <h5 className="text-xl font-bold border-b flex-grow pb-1">Demos</h5>
                    <form className="flex relative">
                        <input type="search" name="search" className='border border-gray-300 py-2 w-60 pl-10 pr-3 outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm rounded' placeholder='Search your artist here...' required />
                        <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                    </form>
                </div>
                <ul>
                    <li className="hover:bg-gray-200 px-3 py-2 border-b">ALMOND SOLUTIONS COMMERCIAL[1]</li>
                    <li className="hover:bg-gray-200 px-3 py-2 border-b">Vishal- Almond Solutions</li>
                    <li className="hover:bg-gray-200 px-3 py-2 border-b">ALMOND SOLUTIONS COMMERCIAL[1]</li>
                    <li className="hover:bg-gray-200 px-3 py-2 border-b">Vishal- Almond Solutions</li>
                    <li className="hover:bg-gray-200 px-3 py-2 border-b">ALMOND SOLUTIONS COMMERCIAL[1]</li>
                </ul>
            </div>
        </div>
    );
};

export default AssignDemo;