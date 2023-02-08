import LeftAside from '../Pages/Home/LeftAside';
import { Outlet } from 'react-router-dom';
import { useReducer } from 'react';
import Navbar from './Shared/Navbar';
import { dropdownInitialState, dropdownReducers } from '../state/reducers/dropdownReducer';

const Root = () => {
    const [state, dispatch] = useReducer(dropdownReducers, dropdownInitialState);

    return (
        <div className='bg-gray-100'>
            <Navbar
                state={state}
                dispatch={dispatch}
            />
            <div className='w-11/12 mx-auto grid grid-cols-12 gap-5 items-start mt-5 pb-5'>
                {/* bg unfocused layer */}
                <div onClick={() => dispatch({ type: "BODY_TAP_ALL_MODAL_CLOSE" })} className={`${!state.searchAndFilterModal && !state.locationDropdown && !state.loginModal && !state.accountModal && !state.skillDropdown && 'hidden'} fixed left-0 top-0 h-screen w-screen`}></div>
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