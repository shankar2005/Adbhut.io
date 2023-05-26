const Badge = ({ type, children, className = "" }) => {
    const statusTypes = {
        error: "text-red-700 bg-red-100",
        success: "text-green-700 bg-green-100",
        warning: "text-yellow-700 bg-yellow-100",
        custom: "",
    }
    return (
        <span class={`px-2 py-1 font-semibold leading-tight rounded-sm
            ${statusTypes[type] || statusTypes.custom}
            ${className}
        `}>{children}</span>
    );
};

export default Badge;