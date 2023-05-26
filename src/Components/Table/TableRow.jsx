const TableRow = ({ label, content }) => {
    return (
        <tr class="text-gray-700">
            <td class="px-4 py-3 border w-3/12">
                <div class="flex items-center text-sm">
                    <p class="font-semibold text-black">{label}</p>
                </div>
            </td>
            <td class="px-4 py-3 text-sm border">
                {content}
            </td>
        </tr>
    );
};

export default TableRow;