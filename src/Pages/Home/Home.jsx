import React, { useContext, useEffect, useState } from 'react';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { MdCelebration } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import LeftAside from './LeftAside';
import Cookies from 'universal-cookie';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import Feed from './Feed';
import RightAside from './RightAside';

const Home = () => {
    const [showSearch, setShowSearch] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("auth_token");
        setIsAuthenticated(false);
    }

    const [demoType, setdemoType] = useState("");
    // handle search
    const [searchText, setSearchText] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(e.target.search.value);
        setShowSearch(false);
        e.target.reset();
    }

    // handle skills
    const [skills, setSkills] = useState([]);
    const [checkedSkills, setcheckedSkills] = useState([]);
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
    }
    console.log(checkedSkills);

    return (
        <div className='bg-gray-100'>
            <nav className='bg-white shadow-md sticky top-0 z-50'>
                <div className='w-11/12 mx-auto flex items-center justify-between'>
                    <div className='flex items-center gap-8 py-3'>
                        <Link to="/"><h4 className='font-medium text-lg'>NsN Co</h4></Link>
                        <div className='relative'>
                            <form onSubmit={handleSearch}>
                                <input onClick={() => setShowSearch(true)} type="text" name="search" className='border bg-blue-50 py-2 w-72 pl-10 pr-3 rounded text-sm' placeholder='Search your artist here...' />
                                <AiOutlineSearch className='w-6 h-6 text-gray-500 absolute top-1/2 -translate-y-1/2 left-2' />
                            </form>
                            <div className={`${!showSearch && 'hidden'} absolute left-0 bg-white w-full border rounded-md p-3 shadow-md`}>
                                <h3 className='font-medium border-b pb-2 mb-3'>Advance Search</h3>
                                {/* dropdown */}
                                <label for="demo-type" class="block mb-2 text-sm font-medium text">Type</label>
                                <select onChange={(e) => {setdemoType(e.target.value)}} id="demo-type" class="outline-0 bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="" selected>All</option>
                                    <option value="Video">Video</option>
                                    <option value="Image">Image</option>
                                    <option value="Instagram Link">Instagram</option>
                                    <option value="Youtube Link">YouTube</option>
                                    <option value="Soundcloud Link">SoundCloud</option>
                                </select>

                                {/* filter with skills */}
                                <label for="demo-type" class="block mb-2 text-sm font-medium text mt-5">Filter with skills</label>
                                <ul onChange={handleSkillsCheckbox} className='flex flex-wrap gap-x-1 gap-y-2 text-sm'>
                                    {
                                        skills?.map(skill => (
                                            <li key={skill.pk}>
                                                <input type="checkbox" id={'#' + skill.name} value={skill.pk} class="hidden peer" required="" />
                                                <label for={'#' + skill.name} class="inline-flex  text-gray-500 bg-white border-2 border-gray-200 rounded-full px-2 py-1 cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500 hover:text-gray-600 peer-checked:text-white">
                                                    <p>{skill.name}</p>
                                                </label>
                                            </li>)
                                        )
                                    }

                                </ul>

                            </div>
                        </div>
                    </div>
                    <ul onClick={() => setShowSearch(false)} className='flex gap-4 text-gray-500 flex-1 py-3'>
                        <li className='ml-auto'><AiFillHome className='w-6 h-6' /></li>
                        <li><MdCelebration className='w-6 h-6' /></li>
                        <li>
                            <button onClick={handleLogout}><FiLogOut className='w-6 h-6' /></button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={() => setShowSearch(false)} className={`${!showSearch && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
                {/* bg unfocused layer */}

                <aside className='col-span-4 sticky top-20'>
                    <LeftAside />
                </aside>

                <main className='col-span-5'>
                    <Feed
                        searchText={searchText}
                        demoType={demoType}
                        checkedSkills={checkedSkills}
                    />
                </main>

                <aside className='col-span-3'>
                    <RightAside />
                </aside>

            </div>
        </div>
    );
};

export default Home;