import { useNavigate } from "react-router-dom";

const ActionCta = ({ suggestions, className }) => {
    const navigate = useNavigate();

    return (
        <div className={`p-2 bg-white ${className || ""}`}>
            <div className='pb-2 skillScroll overflow-x-scroll flex gap-2 text-sm font-medium select-none'>
                {
                    suggestions.map((suggestion, key) => <div
                        key={key}
                        onClick={() => navigate(suggestion[1])}
                        className='whitespace-nowrap py-1 px-3 border text-blue-500 border-blue-500 rounded-full cursor-pointer hover:bg-blue-100'>
                        {suggestion[0]}
                    </div>)
                }
            </div>
        </div>
    );
};

export default ActionCta;