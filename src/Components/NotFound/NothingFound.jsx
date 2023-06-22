const NothingFound = ({ heading, description, className }) => {
    return (
        <div className={`bg-white p-20 rounded-lg shadow flex flex-col items-center text-center ${className}`}>
            <img className='w-48' src="https://cdni.iconscout.com/illustration/premium/thumb/search-result-not-found-2130361-1800925.png" alt="" />
            <h1 className='text-xl mb-1'>{heading || "No results found"}</h1>
            <small>{description || "Try searching with different skill again."}</small>
        </div>
    );
};

export default NothingFound;