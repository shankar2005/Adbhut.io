import React, { createContext, useContext, useEffect, useState } from 'react';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");
    // navbar search text
    const [searchText, setSearchText] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);


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
        if (chatLog.length === 1) {
            setchatLog(chatLog => [...chatLog, { actionResponse: true, msgID: chatLog.length + 1, bot: 'Great! Maruf let’s proceed with the project briefing. Share us your thoughts and inputs on your creative project.' }]);
        }
    }, [chatLog]);
    //-------------------------------------------------------------
    //-------------------------------------------------------------


    // stored values
    const value = {
        searchText,
        demoType,
        setdemoType,
        checkedSkills,
        setcheckedSkills,
        shortlistedArtist,
        setshortlistedArtist,
        selectedContentProducts,
        setselectedContentProducts,
        chatLog,
        setchatLog,
    }

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;