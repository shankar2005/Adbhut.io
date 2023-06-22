import { BiFilterAlt } from 'react-icons/bi';
import Select from 'react-select';
import Input from '../../Components/Input/Input';
import { useRootContext } from '../../contexts/RootProvider';
import Cta from '../Home/Components/Cta';

const FilterArtist = () => {
    const { setViewAs, suggestions, removedSkills, contentProducts, selectedContentProduct, handleSelectContentProduct } = useRootContext();

    return (
        <div className='w-[92vw] md:w-full bg-white rounded-lg shadow-lg border mb-2 p-2 z-50'>
            <h1 className='p-2 font-medium flex items-center gap-1 mb-1'><BiFilterAlt className='text-blue-600' size={20} /> Filter</h1>
            <div>
                {/* <div className='pb-2 flex categoryScroll overflow-x-scroll gap-2 text-sm font-medium select-none'>
                    {
                        contentProducts.map(contentProduct => <div
                            onClick={() => handleSelectContentProduct(contentProduct)}
                            key={contentProduct.pk}
                            className='whitespace-nowrap py-1 px-3 border text-gray-500 border-gray-500 rounded-full cursor-pointer hover:bg-blue-100'>
                            {contentProduct.name}
                        </div>)
                    }
                </div> */}
                {
                    (suggestions?.length > 0 || removedSkills?.length > 0) &&
                    <Cta />
                }
            </div>
        </div >
    );
};

export default FilterArtist;