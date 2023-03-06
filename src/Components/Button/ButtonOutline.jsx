import React from 'react';

const ButtonOutline = ({ children, type, variant, onClick }) => {
    const colors = {
        primary: "border border-sky-500 hover:bg-sky-600 focus:ring-sky-300 text-sky-600 hover:text-white",
        secondary: "border border-gray-500 hover:bg-gray-600 focus:ring-gray-300 text-gray-600 hover:text-white",
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
            className={`focus:ring-4 focus:outline-none font-medium rounded-full text-sm w-fit sm:w-auto px-5 py-2.5 text-center active:scale-90 duration-200
            ${colors[variant] || colors.primary}
            `}
        >
            {children}
        </button>
    );
};

export default ButtonOutline;