import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiDelete } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");
    // navbar search text
    const [searchText, setSearchText] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);
    const [checkedGenres, setcheckedGenres] = useState([]);


    //-------------------------------------------------------------
    //-------------------------------------------------------------
    // artist shortlisting
    const [shortlistedArtist, setshortlistedArtist] = useState([]);
    // clicking content products
    const [selectedContentProducts, setselectedContentProducts] = useState("");

    // chatlog
    const [chatLog, setchatLog] = useState([]);

    // setting response msg on first action
    useEffect(() => {
        const isExist = chatLog.find(chat => chat.actionResponse);
        if (chatLog.length === 1 && !isExist) {
            setchatLog(chatLog => [...chatLog, { actionResponse: true, msgID: chatLog.length + 1, bot: 'Great! Maruf let’s proceed with the project briefing. Share us your thoughts and inputs on your creative project.' }]);
        }
    }, [chatLog]);
    //-------------------------------------------------------------
    //-------------------------------------------------------------

    const handleRemoveShortlistedArtist = (msgID, artistID) => {
        // remove chatlog
        setchatLog(current => [...current.filter(msg => msg.msgID !== msgID)]);
        // remove selected artist
        setshortlistedArtist(current => [...current.filter(artist => artist.artistID !== artistID)]);
    }

    const handleShortlist = (artistID, name, profile_pic) => {
        const isExist = shortlistedArtist.find(artist => artist.artistID === artistID);
        if (!isExist) {
            setshortlistedArtist(current => [...current, { name, artistID }]);
            // chatlog
            setchatLog(current => [...current, { msgID: current.length + 1, user: <>Shortlisted <Link to={`/artist/${artistID}`} className='hover:underline'><img className='w-8 h-8 inline bg-white object-cover' src={profile_pic} alt="" /> {name}</Link> <FiDelete onClick={() => handleRemoveShortlistedArtist(current.length + 1, artistID)} className='inline w-5 h-5 cursor-pointer' /></> }]);
        } else {
            toast('Already shortlisted');
        }
    }

    // stored values
    const value = {
        searchText,
        demoType,
        setdemoType,
        checkedSkills,
        setcheckedSkills,
        checkedGenres,
        setcheckedGenres,
        shortlistedArtist,
        setshortlistedArtist,
        selectedContentProducts,
        setselectedContentProducts,
        chatLog,
        setchatLog,
        handleShortlist,
    }

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;