const Button = ({ children, type, variant, onClick, className }) => {
    const colors = {
        primary: "bg-blue-500 focus:bg-blue-600 text-white",
        secondary: "bg-gray-500 focus:bg-gray-600 text-white",
        danger: "bg-red-500 focus:bg-red-600 text-white",
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
            className={`font-medium rounded text-sm w-fit sm:w-auto px-5 py-2.5 text-center
            ${colors[variant] || colors.primary}
            ${className || ''}
            `}
        >
            {children}
        </button>
    );
};

export default Button;