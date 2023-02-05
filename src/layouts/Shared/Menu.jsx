import { MdOutlineArrowForwardIos } from 'react-icons/md';

const Menu = () => {
    return (
        <div className="flex px-5 py-3 border-t" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 font-medium">
                <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-sm hover:text-blue-600 ">
                        Service Chat
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                        <MdOutlineArrowForwardIos />
                        <a href="#" className="ml-1 text-sm text-gray-700 hover:text-blue-600 md:ml-2">Project Dashboard</a>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <MdOutlineArrowForwardIos />
                        <a href="#" className="ml-1 text-sm text-gray-700 hover:text-blue-600 md:ml-2">Artists List</a>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <MdOutlineArrowForwardIos />
                        <a href="#" className="ml-1 text-sm text-gray-700 hover:text-blue-600 md:ml-2">Toolkit</a>
                    </div>
                </li>
            </ol>
        </div>
    );
};

export default Menu;