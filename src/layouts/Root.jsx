import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import LeftAside from '../Pages/Home/LeftAside';
import { IoIosArrowDown } from 'react-icons/io';
import Cookies from 'universal-cookie';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import { useRootContext } from '../contexts/RootProvider';
import avatar from '../assets/placeholders/avatar.png';
import { ImOffice } from 'react-icons/im';
import { TfiWorld } from 'react-icons/tfi';
import { HiUsers } from 'react-icons/hi';
import logo from '../assets/logo.jpeg';
import AuthSection from '../Pages/Auth/AuthSection';

const Root = () => {
    const { setdemoType, setSearchText, checkedSkills, setcheckedSkills, checkedGenres, setcheckedGenres, setcheckedLocations } = useRootContext();

    const [showLocationDropdown, setshowLocationDropdown] = useState(false);
    const [showUser, setshowUser] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("auth_token");
        setIsAuthenticated(false);
        setshowUser(false);
    }

    const handleBodyTapModalClose = () => {
        setShowSearch(false);
        setshowLocationDropdown(false);
        setskillSearchDropDown(false);
        setshowUser(false);
        setLoginModal(false);
        setskillSearchDropDown(false)
    }

    const resetFeed = () => {
        setSearchText("")
        setdemoType("")
        setcheckedSkills([]);
        setcheckedGenres([]);
        setcheckedLocations([]);
    }

    const [skillSearchDropDown, setskillSearchDropDown] = useState(false);

    // handle search
    const [showSearch, setShowSearch] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(e.target.search.value);
        setShowSearch(false);
        e.target.reset();
    }

    // handle skills
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_skill/`)
            .then(res => res.json())
            .then(data => {
                setSkills(data);
            })
            .catch(err => console.log(err));
    }, [])
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

    // location search
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        fetch(`https://dev.nsnco.in/api/v1/get_location/`)
            .then(res => res.json())
            .then(data => {
                setLocations(data);
            })
            .catch(err => console.log(err));
    }, [])

    const handleLocationCheckbox = (e) => {
        e.target.checked && setcheckedLocations(current => [...current, e.target.value]);
        e.target.checked || setcheckedLocations(current => [...current.filter(location => location !== e.target.value)]);
    }

    return (
        <div className='bg-gray-100'>
            <nav className='bg-white shadow-md sticky top-0 z-50'>
                <div className='w-11/12 mx-auto flex items-center justify-between'>
                    <div className='flex items-center gap-8 py-3'>
                        <Link to="/">
                            <img onClick={resetFeed} className='w-10' src={logo} alt="" />
                        </Link>
                        <div className='relative flex'>
                            <form onSubmit={handleSearch}>
                                <input onClick={() => setShowSearch(true)} type="text" name="search" className='border bg-blue-50 py-2 w-72 pl-10 pr-3 rounded text-sm' placeholder='Search your artist here...' required />
                                <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                                <button className="focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center border border-gray-500 text-gray-600 hover:bg-gray-200 ml-2" type="submit">Search</button>
                            </form>

                            {/* skill dropdown */}
                            <div className='relative ml-2'>
                                <button onClick={() => setskillSearchDropDown(!skillSearchDropDown)} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center bg-blue-500 hover:bg-blue-600" type="button">Skill search {skillSearchDropDown ? <IoIosArrowDown className='ml-2 w-4 h-4 rotate-180' /> : <IoIosArrowDown className='ml-2 w-4 h-4' />}</button>

                                <div id="dropdownSearch" className={`${!skillSearchDropDown && 'hidden'} z-10 absolute bg-white rounded shadow w-60`}>
                                    <div className="p-3">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <AiOutlineSearch className='text-gray-500 w-5 h-5' />
                                            </div>
                                            <input onKeyUp={searchSkill} type="text" className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 placeholder-gray-400 focus:ring-blue-500" placeholder="Search skill" />
                                        </div>
                                    </div>
                                    <ul onChange={handleSkillsCheckbox} className="min-h-fit max-h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
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
                                                    allGenres?.filter(genre => genre[0].toLowerCase().startsWith(genreSearchText))
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
                            <div className='relative ml-2'>
                                <button onClick={() => setshowLocationDropdown(!showLocationDropdown)} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center bg-blue-500 hover:bg-blue-600" type="button">Location search <IoIosArrowDown className='ml-2 w-4 h-4' /></button>

                                <div id="dropdownSearch" className={`${!showLocationDropdown && 'hidden'} z-10 absolute bg-white rounded shadow w-60`}>
                                    <div className="p-3">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <AiOutlineSearch className='text-gray-500 w-5 h-5' />
                                            </div>
                                            <input onKeyUp={searchLocation} type="text" className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 placeholder-gray-400 focus:ring-blue-500" placeholder="Search location" />
                                        </div>
                                    </div>
                                    <ul onChange={handleLocationCheckbox} className="min-h-fit max-h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">
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

                            {/* <div className={`${!showSearch && 'hidden'} absolute left-0 bg-white w-full border rounded-md p-3 shadow-md`}>
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
                            </div> */}
                        </div>
                    </div>
                    <ul className='flex items-center gap-4 text-gray-500 flex-1 py-3'>
                        {
                            isAuthenticated &&
                            <>
                                <li className='ml-auto flex items-center gap-2 relative'>
                                    <img onClick={() => setshowUser(!showUser)} className='w-10 h-10' src="https://thhs.in/assets/avatar-2200a5cf.png" alt="" />
                                    {/* modal */}
                                    <div className={`${!showUser && 'hidden'} absolute top-12 right-0 bg-white w-60 border rounded-md p-3 shadow-2xl`}>
                                        <div className='relative'>
                                            <img className='rounded-t-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ATiUg17HuXkHqkRB436JTxNVqh55NdWSZQ&usqp=CAU" alt="" />
                                            <div className='rounded-full bg-white absolute bottom-0 right-1/2 translate-y-1/2 translate-x-1/2 border-4 border-white'>
                                                <img className='w-16 h-16 rounded-full' src="https://thhs.in/assets/avatar-2200a5cf.png" alt="" />
                                            </div>
                                        </div>
                                        <div className='mt-12 pt-0 p-4 text-center'>
                                            <h4 className='font-medium text-lg'>Md Maruf Hossain</h4>
                                            <div className='text-sm text-gray-600'>
                                                @maruf <br />
                                                <p className='flex items-center justify-center gap-1 mt-1'><ImOffice /> NsN Co</p>
                                                <p className='flex items-center justify-center gap-1 mt-1'><TfiWorld /> https://nsnco.in/</p>
                                            </div>
                                        </div>
                                        <button className='flex items-center gap-1 mx-auto border p-1 rounded-lg' onClick={handleLogout}>Logout <FiLogOut className='w-5 h-5' /></button>
                                    </div>
                                </li>
                            </>
                        }
                        {
                            !isAuthenticated &&
                            <li className='ml-auto relative'>
                                <button onClick={() => setLoginModal(!loginModal)} className="focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded text-sm px-4 py-2 text-center inline-flex items-center border border-gray-500 text-gray-600 hover:bg-gray-200 ml-2" type="button">Login</button>
                                {/* login modal */}
                                <div className={`${!loginModal && 'hidden'} absolute top-[51px] right-0 bg-white w-72 border rounded-md p-5 shadow-2xl`}>
                                    <AuthSection />
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={handleBodyTapModalClose} className={`${!showSearch && !showLocationDropdown && !loginModal && !showUser && !skillSearchDropDown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <aside className='col-span-4 sticky top-20'>
                    <LeftAside />
                </aside>

                <div className='col-span-8'>
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default Root;