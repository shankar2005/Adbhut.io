const Button = ({ children, type, variant, onClick, className }) => {
    const colors = {
        primary: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300 text-white",
        danger: "bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white",
    }

    const types = {
        button: "button",
        submit: "submit",
        reset: "reset",
    }

    return (
        <button
            type={types[type] || types.button}
            onClick={onClick}
            className={`focus:ring-4 focus:outline-none font-medium rounded text-sm w-fit sm:w-auto px-5 py-2.5 text-center active:scale-90 duration-200
            ${colors[variant] || colors.primary}
            ${className || ''}
            `}
        >
            {children}
        </button>
    );
};

export default Button;