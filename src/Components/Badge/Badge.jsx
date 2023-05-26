const Badge = ({ type, children }) => {
    const statusTypes = {
        error: "text-red-700 bg-red-100",
        success: "text-green-700 bg-green-100",
        warning: "text-yellow-700 bg-yellow-100"
    }
    return (
        <span class={`px-2 py-1 font-semibold leading-tight rounded-sm
            ${statusTypes[type] || statusTypes.error}
        `}>{children}</span>
    );
};

export default Badge;