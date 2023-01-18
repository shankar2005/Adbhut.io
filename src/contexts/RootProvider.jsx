import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");
    // navbar search text
    const [searchText, setSearchText] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);
    const [checkedGenres, setcheckedGenres] = useState([]);

    const cookies = new Cookies();
    const authToken = cookies.get('auth_token');

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

    const handleShortlist = (artistID, name, profile_pic) => {
        const isExist = shortlistedArtist.find(artist => artist.artistID === artistID);
        if (!isExist) {
            setshortlistedArtist(current => [...current, { name, artistID }]);
            // chatlog
            setchatLog(current => [...current, { type: 'shortlistedArtist', msgID: current.length + 1, artist: { artistID, name, profile_pic } }]);
        } else {
            toast('Already shortlisted');
        }
    }

    // show project history on click
    const handleShowProjectHistory = (projectID) => {
        fetch(`https://dev.nsnco.in/api/v1/edit_project/${projectID}/`, {
            headers: { Authorization: `token ${authToken}` },
        }).then(res => res.json())
            .then(data => {
                if (data.detail === 'Authentication credentials were not provided.') {
                    return;
                }
                setchatLog(JSON.parse(data.brief));
            });
    }

    // stored values
    const value = {
        searchText,
        setSearchText,
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
        authToken,
        handleShowProjectHistory
    }

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;