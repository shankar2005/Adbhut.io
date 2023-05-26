const TableRow = ({ label, content }) => {
    return (
        <tr>
            <td class="px-4 py-3 border w-3/12">
                <div class="flex items-center text-sm">
                    <p class="font-semibold text-black">{label}</p>
                </div>
            </td>
            <td class="px-4 py-3 text-sm border whitespace-pre-wrap">
                {content}
            </td>
        </tr>
    );
};

export default TableRow;