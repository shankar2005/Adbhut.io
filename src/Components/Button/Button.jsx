const Button = ({ children, type, variant, size, onClick, className }) => {
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

    const sizes = {
        sm: "px-2 py-1",
        md: "px-5 py-2.5",
    }

    return (
        <button
            type={types[type] || types.button}
            onClick={onClick}
            className={`font-medium rounded text-sm w-fit sm:w-auto text-center
            ${sizes[size] || sizes.md}
            ${colors[variant] || colors.primary}
            ${className || ''}
            `}
        >
            {children}
        </button>
    );
};

export default Button;