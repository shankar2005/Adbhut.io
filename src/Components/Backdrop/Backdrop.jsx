const Backdrop = ({ children, onClick }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Backdrop;