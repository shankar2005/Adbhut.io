const TableRow = ({ label, content }) => {
    return (
        <tr>
            <td className="px-4 py-3 border w-3/12">
                <div className="flex items-center text-sm">
                    <p className="font-semibold text-black">{label}</p>
                </div>
            </td>
            <td className="px-4 py-3 text-sm border whitespace-pre-wrap">
                {content}
            </td>
        </tr>
    );
};

export default TableRow;