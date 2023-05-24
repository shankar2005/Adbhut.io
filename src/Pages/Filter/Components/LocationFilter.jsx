import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useRootContext } from '../../../contexts/RootProvider';
import { showLocation } from '../../../features/dropdown/dropdownSlice';
import { useGetLocationsQuery } from '../../../features/utils/utilsApi';

const LocationFilter = () => {
    const { setcheckedLocations } = useRootContext();
    const {data: locations } = useGetLocationsQuery();
    const dispatch = useDispatch();
    const { locationDropdown } = useSelector(state => state.dropdown);

    const [locationSearchText, setlocationSearchText] = useState("");
    const searchLocation = (e) => {
        setlocationSearchText(e.target.value.toLowerCase());
    }

    const handleLocationCheckbox = (e) => {
        e.target.checked && setcheckedLocations(current => [...current, e.target.value]);
        e.target.checked || setcheckedLocations(current => [...current.filter(location => location !== e.target.value)]);
    }

    return (
        <div className='hidden md:block relative ml-2'>
            <button
                onClick={() => dispatch(showLocation())}
                id="dropdownLocationSearchButton"
                data-dropdown-toggle="dropdownSearch"
                data-dropdown-placement="bottom"
                className="text-white focus:ring-1 focus:outline-none focus:ring-blue-400 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center bg-sky-500 hover:bg-sky-600"
                type="button"
            >
                Location search {locationDropdown ? <IoIosArrowDown className='ml-2 w-4 h-4 rotate-180' /> : <IoIosArrowDown className='ml-2 w-4 h-4' />}
            </button>

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
    );
};

export default LocationFilter;