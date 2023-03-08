import { useRootContext } from '../../../contexts/RootProvider';

const Cta = ({ suggestions, removedSkills, className }) => {
    const { handleSelectSkill } = useRootContext();

    return (
        <div className={`p-2 bg-white ${className || ""}`}>
            <div className='pb-2 skillScroll overflow-x-scroll flex gap-2 text-sm font-medium select-none'>
                {
                    suggestions.map(skill => <div
                        onClick={() => handleSelectSkill(skill)}
                        key={`suggestedSkill${skill[1]}`}
                        className='whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                        {skill[0]}
                    </div>)
                }
                {
                    removedSkills.length > 0 &&
                    removedSkills.map(skill => <div
                        key={`removedSkill${skill[1]}`}
                        className='whitespace-nowrap py-1 px-3 border text-white border-blue-500 bg-blue-500 rounded-full'>
                        {skill[0]}
                    </div>)
                }
            </div>
        </div>
    );
};

export default Cta;