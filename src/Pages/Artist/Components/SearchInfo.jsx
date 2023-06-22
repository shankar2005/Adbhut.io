import { CiCircleRemove } from 'react-icons/ci';

const SearchInfo = ({ searchText, clearSearch }) => {
    return searchText && (
        <div className='flex items-center gap-2'>
            <h1 className='my-3 font-hero'>Results for <span className='bg-yellow-300'>"{searchText}"</span></h1>
            <CiCircleRemove size={25} onClick={clearSearch} className="cursor-pointer" />
        </div>
    );
};

export default SearchInfo;