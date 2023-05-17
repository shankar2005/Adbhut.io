import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useRootContext } from '../../../contexts/RootProvider';
import { showSkill } from '../../../features/dropdown/dropdownSlice';

const SkillFilter = () => {
    const { checkedSkills, setcheckedSkills, checkedGenres, setcheckedGenres, skills } = useRootContext();
    const dispatch = useDispatch();
    const { skillDropdown } = useSelector(state => state.dropdown);

    const handleSkillsCheckbox = (e) => {
        e.target.checked && setcheckedSkills(current => [...current, e.target.value]);
        e.target.checked || setcheckedSkills(current => [...current.filter(skill => skill !== e.target.value)]);
        // remove genres(IDs) from checkedGenres when the skill will be unchecked
        if (!e.target.checked) {
            const targetedSkillGenres = skills.find(skill => skill.pk + '' === e.target.value).genre;
            const targetedSkillGenresIDs = targetedSkillGenres.map(genre => genre[1] + '');;
            const rest = checkedGenres.filter(genre => !targetedSkillGenresIDs.includes(genre));
            setcheckedGenres(rest);
        }
    }

    const handleGenreCheckbox = (e) => {
        e.target.checked && setcheckedGenres(current => [...current, e.target.value]);
        e.target.checked || setcheckedGenres(current => [...current.filter(genre => genre !== e.target.value)]);
    }
    // empty checked genres when no skill is selected
    useEffect(() => {
        if (checkedSkills.length < 1) {
            setcheckedGenres([]);
        }
    }, [checkedSkills]);

    // get genres
    const checkedSkillsWithAllValues = checkedSkills.map(checkedSkill => skills.find(skill => checkedSkill === skill.pk + ''));
    const genres = checkedSkillsWithAllValues.map(skill => skill.genre);
    const allGenres = [];
    genres?.forEach(genre => {
        allGenres.push(...genre);
    })

    // handle skill search
    const [skillSearchText, setskillSearchText] = useState("");
    const searchSkill = (e) => {
        setskillSearchText(e.target.value.toLowerCase());
    }
    // handle genre search
    const [genreSearchText, setgenreSearchText] = useState("");
    const searchGenre = (e) => {
        setgenreSearchText(e.target.value.toLowerCase());
    }

    return (
        <div className='hidden md:block relative ml-2'>
            <button
                onClick={() => dispatch(showSkill())}
                id="dropdownSkillSearchButton"
                data-dropdown-toggle="dropdownSearch"
                data-dropdown-placement="bottom"
                className="text-white focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center bg-sky-500 hover:bg-sky-600"
                type="button"
            >
                Skill search {skillDropdown ? <IoIosArrowDown className='ml-2 w-4 h-4 rotate-180' /> : <IoIosArrowDown className='ml-2 w-4 h-4' />}
            </button>

            <div id="dropdownSkillSearch" className={`${!skillDropdown && 'hidden'} z-10 absolute bg-white rounded shadow w-60`}>
                <div className="p-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <AiOutlineSearch className='text-gray-500 w-5 h-5' />
                        </div>
                        <input onKeyUp={searchSkill} type="text" className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 placeholder-gray-400 focus:ring-blue-500" placeholder="Search skill" />
                    </div>
                </div>
                <ul onChange={handleSkillsCheckbox} className="min-h-fit max-h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 z-40" aria-labelledby="dropdownSkillSearchButton">
                    {
                        skills?.filter(skill => skill.name.toLowerCase().startsWith(skillSearchText))
                            .map(skill => (
                                <li key={`skill${skill.pk}`}>
                                    <div className="flex items-center pl-2 rounded hover:bg-gray-100">
                                        <input defaultChecked={checkedSkills.includes(skill.pk.toString())} id={'#' + skill.name} type="checkbox" value={skill.pk} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                        <label htmlFor={'#' + skill.name} className="w-full py-2 ml-2 text-xs font-medium text-gray-900 rounded">{skill.name}</label>
                                    </div>
                                </li>
                            ))
                    }
                </ul>
                {/* genre */}
                {
                    allGenres?.length > 0 &&
                    <>
                        <div className="p-3 border-t-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <AiOutlineSearch className='text-gray-500 w-5 h-5' />
                                </div>
                                <input onKeyUp={searchGenre} type="text" className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 placeholder-gray-400 focus:ring-blue-500" placeholder="Search genre" />
                            </div>
                        </div>
                        <ul onChange={handleGenreCheckbox} className="min-h-fit max-h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
                            {
                                allGenres?.length > 0 &&
                                allGenres.filter(genre => genre[0].toLowerCase().startsWith(genreSearchText))
                                    .map((genre, idx) => (
                                        <li key={`dropdownGenre${idx}`}>
                                            <div className="flex items-center pl-2 rounded hover:bg-gray-100">
                                                <input id={'genre_' + genre[1]} type="checkbox" value={genre[1]} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                <label htmlFor={'genre_' + genre[1]} className="w-full py-2 ml-2 text-xs font-medium text-gray-900 rounded">{genre[0]}</label>
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </>
                }
            </div>
        </div>
    );
};

export default SkillFilter;