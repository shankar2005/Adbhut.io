import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineBars } from 'react-icons/ai';
import { useRootContext } from '../../contexts/RootProvider';
import logo from '../../assets/cn.jpeg';
import nsnlogo from '../../assets/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AuthModal from '../../Pages/Auth/Components/AuthModal';
import ProfileDropdown from '../../Pages/User/Components/ProfileDropdown';
import adbhutGIF from '../../assets/logos/adbhutGIF.gif';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../features/filter/filterSlice';
import { closeLogin, showAccount, showLocation, showLogin, showSkill } from '../../features/dropdown/dropdownSlice';
import { BiMessageDots } from 'react-icons/bi';

const Navbar = ({ setShowToolkit }) => {
    const { setdemoType, checkedSkills, setcheckedSkills, checkedGenres, setcheckedGenres, setcheckedLocations, locations, skills } = useRootContext();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const {
        skillDropdown,
        locationDropdown,
        loginModal,
        accountModal,
        searchAndFilterModal,
    } = useSelector(state => state.dropdown);

    const navigate = useNavigate();
    // handle search
    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/artists");
        dispatch(setSearch(e.target.search.value));
        e.target.reset();
    }

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
    // handle genre search
    const [locationSearchText, setlocationSearchText] = useState("");
    const searchLocation = (e) => {
        setlocationSearchText(e.target.value.toLowerCase());
    }

    const handleLocationCheckbox = (e) => {
        e.target.checked && setcheckedLocations(current => [...current, e.target.value]);
        e.target.checked || setcheckedLocations(current => [...current.filter(location => location !== e.target.value)]);
    }

    return (
        <nav className='bg-white shadow-md sticky top-0 z-50'>
            <div className='w-11/12 max-w-screen-xl mx-auto flex items-center justify-between'>
                <div className='flex items-center gap-8 py-3'>
                    <Link to="/" className='md:hidden'>
                        <img src={adbhutGIF} className='w-28 md:w-32' />
                    </Link>
                    <div className='hidden md:flex relative'>
                        <form onSubmit={handleSearch} className="flex">
                            <input onClick={() => { }} type="text" name="search" className='border bg-blue-50 py-2 w-72 pl-10 pr-3 rounded text-sm' placeholder='Search your artist here...' required />
                            <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                            <button className="focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center border border-gray-500 text-gray-600 hover:bg-gray-200 ml-2" type="submit">Search</button>
                        </form>

                        {/* skill dropdown */}
                        <div className='hidden md:block relative ml-2'>
                            <button onClick={() => dispatch(showSkill())} id="dropdownSkillSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center bg-sky-500 hover:bg-sky-600" type="button">Skill search {skillDropdown ? <IoIosArrowDown className='ml-2 w-4 h-4 rotate-180' /> : <IoIosArrowDown className='ml-2 w-4 h-4' />}</button>

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

                        {/* location dropdown */}
                        <div className='hidden md:block relative ml-2'>
                            <button onClick={() => dispatch(showLocation())} id="dropdownLocationSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center bg-sky-500 hover:bg-sky-600" type="button">Location search {locationDropdown ? <IoIosArrowDown className='ml-2 w-4 h-4 rotate-180' /> : <IoIosArrowDown className='ml-2 w-4 h-4' />}</button>

                            <div id="dropdownLocationSearch" className={`${!locationDropdown && 'hidden'} z-10 absolute bg-white rounded shadow w-60`}>
                                <div className="p-3">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <AiOutlineSearch className='text-gray-500 w-5 h-5' />
                                        </div>
                                        <input onKeyUp={searchLocation} type="text" className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 placeholder-gray-400 focus:ring-blue-500" placeholder="Search location" />
                                    </div>
                                </div>
                                <ul onChange={handleLocationCheckbox} className="min-h-fit max-h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 z-40" aria-labelledby="dropdownLocationSearchButton">
                                    {
                                        locations?.filter(location => location.name.toLowerCase().startsWith(locationSearchText))
                                            .map(location => (
                                                <li key={location.pk}>
                                                    <div className="flex items-center pl-2 rounded hover:bg-gray-100">
                                                        <input id={'#' + location.name} type="checkbox" value={location.pk} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                        <label htmlFor={'#' + location.name} className="w-full py-2 ml-2 text-xs font-medium text-gray-900 rounded">{location.name}</label>
                                                    </div>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </div>
                        </div>

                        {/* search and filter modal */}
                        <div className={`${!searchAndFilterModal && 'hidden'} absolute left-0 bg-white w-full border rounded-md p-3 shadow-md`}>
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
                                    skills?.map(skill => (
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

                    </div>
                </div>
                <ul className='flex items-center gap-4 text-gray-500 flex-1 py-3 justify-end'>
                    <li className='ml-auto lg:hidden'>
                        <Link to="/projects/chat">
                            <BiMessageDots size={25} />
                        </Link>
                    </li>
                    {
                        user.email &&
                        <li className='flex items-center gap-2 relative'>
                            <img className='hidden md:block w-24' src={logo} alt="" />
                            <img onClick={() => dispatch(showAccount())} className='w-10 h-10 rounded-full border' src={user?.role === "Client" ? "https://www.w3schools.com/howto/img_avatar.png" : nsnlogo} alt="" />
                            {/* modal */}
                            <div className={`${!accountModal && 'hidden'} absolute top-12 right-0`}>
                                <ProfileDropdown />
                            </div>
                        </li>
                    }
                    {
                        !user.email &&
                        <li>
                            <button onClick={() => dispatch(showLogin())} className="focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center border border-gray-500 text-gray-600 hover:bg-gray-200" type="button">Login</button>
                            {/* auth modal */}
                            <AnimatePresence initial={false} exitBeforeEnter={true}>
                                {loginModal && <AuthModal onClick={() => dispatch(closeLogin())} />}
                            </AnimatePresence>
                        </li>
                    }
                    <AiOutlineBars className='cursor-pointer' onClick={() => setShowToolkit(prev => !prev)} size={25} />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;