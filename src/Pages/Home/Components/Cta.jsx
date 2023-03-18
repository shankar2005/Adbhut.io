import { useNavigate } from 'react-router-dom';
import { useRootContext } from '../../../contexts/RootProvider';

const Cta = ({ className }) => {
    const { handleSelectSkill, handleClearFilter, removedSkills, suggestions } = useRootContext();
    const navigate = useNavigate();

    return (
        <div className={`p-2 bg-white ${className || ""}`}>
            <div className='pl-2 pt-2 pb-2.5 skillScroll overflow-x-scroll flex gap-2 text-sm font-medium select-none'>
                {
                    suggestions.map((skill, idx) => <div
                        onClick={() => {
                            handleSelectSkill(skill);
                            navigate("/artists");
                        }}
                        key={`suggestedSkill${skill[1]}`}
                        className={idx === 0
                            ? 'blob blue whitespace-nowrap py-1 px-3 border text-blue-600 border-blue-500 bg-blue-100 rounded-full cursor-pointer'
                            : 'whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'
                        }
                    >
                        {skill[0]}
                    </div>)
                }
                {
                    !suggestions.length &&
                    <div onClick={handleClearFilter} className='whitespace-nowrap py-1 px-3 border text-gray-500 border-gray-500 rounded-full cursor-pointer hover:bg-gray-100'>
                        Clear Filter
                    </div>
                }
                {
                    removedSkills?.length > 0 &&
                    removedSkills.map(skill => <div
                        key={`removedSkill${skill[1]}`}
                        className='whitespace-nowrap py-1 px-3 border text-white border-blue-500 bg-blue-500 rounded-full'>
                        {skill[0]}
                    </div>)
                }
            </div>
        </div >
    );
};

export default Cta;