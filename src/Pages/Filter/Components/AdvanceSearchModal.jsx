import { useSelector } from "react-redux";
import { useRootContext } from "../../../contexts/RootProvider";

const AdvanceSearchModal = () => {
    const { skills } = useRootContext();
    const { searchAndFilterModal } = useSelector(state => state.filter);
    const handleSkillsCheckbox = () => { }

    return (
        <div className={`${!searchAndFilterModal && ''} absolute left-0 bg-white w-full border rounded-md p-3 shadow-md`}>
            <h3 className='font-medium border-b pb-2 mb-3'>Advance Search</h3>
            <label htmlFor="demo-type" className="block mb-2 text-sm font-medium text">Type</label>
            <select onChange={(e) => { setdemoType(e.target.value) }} id="demo-type" className="outline-0 bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500">
                <option defaultValue="">All</option>
                <option value="Video">Video</option>
                <option value="Image">Image</option>
                <option value="Instagram Link">Instagram</option>
                <option value="Youtube Link">YouTube</option>
                <option value="Soundcloud Link">SoundCloud</option>
            </select>

            <label htmlFor="demo-type" className="block mb-2 text-sm font-medium text mt-5">Filter with skills</label>
            <ul onChange={handleSkillsCheckbox} className='flex flex-wrap gap-x-1 gap-y-2 text-sm'>
                {
                    skills?.slice(0, 20)?.map(skill => (
                        <li key={skill.pk}>
                            <input type="checkbox" id={'#' + skill.name} value={skill.pk} className="hidden peer" required="" />
                            <label htmlFor={'#' + skill.name} className="inline-flex  text-gray-500 bg-white border-2 border-gray-200 rounded-full px-2 py-1 cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500 hover:text-gray-600 peer-checked:text-white">
                                <p>{skill.name}</p>
                            </label>
                        </li>)
                    )
                }
            </ul>
        </div>
    );
};

export default AdvanceSearchModal;