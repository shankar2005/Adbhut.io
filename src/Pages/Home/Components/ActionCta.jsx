const ActionCta = ({ suggestions, className }) => {
    const types = {
        primary: "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white",
        warning: "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 text-white border-yellow-500",
        danger: "bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white",
    }

    return (
        <div className={`p-2 bg-white ${className || ""}`}>
            <div className='pb-2 skillScroll overflow-x-scroll flex gap-2 text-sm font-medium select-none'>
                {
                    suggestions.map((suggestion, key) => <div
                        key={key}
                        onClick={suggestion[1]}
                        className={`whitespace-nowrap py-1 px-3 border ${types[suggestion[2]] || types.primary} rounded-lg rounded-tr-none cursor-pointer active:scale-90 duration-150`}>
                        {suggestion[0]}
                    </div>)
                }
            </div>
        </div>
    );
};

export default ActionCta;