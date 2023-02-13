import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { sendMessageAPI } from '../apis/messages/messages';
import { getCurrentProjects, getDreamProjects } from '../apis/projects/projects';
import { AuthContext } from './AuthProvider';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");
    // navbar search text
    const [searchText, setSearchText] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);
    const [checkedGenres, setcheckedGenres] = useState([]);
    const [checkedLocations, setcheckedLocations] = useState([]);

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
            setchatLog(chatLog => [...chatLog, { actionResponse: true, msgID: chatLog.length + 1, bot: `Great! ${user?.name || 'Guest Account'} let’s proceed with the project briefing. Share us your thoughts and inputs on your creative project.` }]);
        }
    }, [chatLog]);
    //-------------------------------------------------------------
    //-------------------------------------------------------------

    const handleShortlist = (artistID, name, profile_pic) => {
        setshortlistedArtist(current => [...current, artistID]);
        // chatlog
        const message = { type: 'shortlistedArtist', msgID: chatLog.length + 1, artist: { artistID, name, profile_pic } };
        setchatLog(current => [...current, message]);

        // saving shortlisted artist in the db
        if (currentProject.pk) {
            sendMessageAPI({
                project_id: currentProject.pk,
                message: message
            })

            // shortlist artist api
            fetch(`https://dev.nsnco.in/api/v1/shortlist_artist/${currentProject.pk}/${artistID}/`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    Authorization: `token ${authToken}`
                }
            })
                .then(res => res.json())
                .then(data => { })
        }

    }

    // show project history on click
    const [currentProject, setcurrentProject] = useState(null);
    const handleShowProjectHistory = (projectID, stage) => {
        if (stage === "DreamProject") {
            fetch(`https://dev.nsnco.in/api/v1/edit_project/${projectID}/`)
                .then(res => res.json())
                .then(data => {
                    setcurrentProject(data);
                    setchatLog(JSON.parse(data.brief));
                    setshortlistedArtist(data.shortlisted_artists);
                });
        } else {
            fetch(`https://dev.nsnco.in/api/v1/edit_project/${projectID}/`, {
                headers: { Authorization: `token ${authToken}` },
            }).then(res => res.json())
                .then(data => {
                    if (data.detail === 'Authentication credentials were not provided.') {
                        return;
                    }
                    setcurrentProject(data);
                    setchatLog(JSON.parse(data.brief));
                    setshortlistedArtist(data.shortlisted_artists);
                });
        }
    }

    // location search
    const { data: locations = [] } = useQuery({
        queryKey: ['locations'],
        queryFn: () => axios('https://dev.nsnco.in/api/v1/get_location/')
            .then(response => response.data)
    })

    // handle skills
    const { data: skills = [] } = useQuery({
        queryKey: ['skills'],
        queryFn: () => axios('https://dev.nsnco.in/api/v1/get_skill/')
            .then(response => response.data)
    })

    // get current projects
    const { data: currentProjects = [], refetch: currentProjectsRefetch } = useQuery({
        queryKey: ['currentProjects', isAuthenticated],
        queryFn: () => getCurrentProjects(authToken)
    })

    // dream projects
    const { data: dreamProjects = [], refetch: dreamProjectsRefetch } = useQuery({
        queryKey: ['dreamProjects'],
        queryFn: () => getDreamProjects(),
    })

    // content products
    const [contentProducts, setcontentProducts] = useState([]);
    useEffect(() => {
        axios('https://dev.nsnco.in/api/v1/get_content_products/')
            .then(response => setcontentProducts(response.data));
    }, [])

    // views
    const [viewAs, setViewAs] = useState("large");
    // view toggle
    const [toggleProjects, settoggleProjects] = useState(true);

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
        handleShowProjectHistory,
        checkedLocations,
        setcheckedLocations,
        currentProject,
        dreamProjects,
        locations,
        skills,
        currentProjects,
        setcurrentProject,
        currentProjectsRefetch,
        dreamProjectsRefetch,
        viewAs,
        setViewAs,
        contentProducts,
        toggleProjects,
        settoggleProjects,
    }

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;