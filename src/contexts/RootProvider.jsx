import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import Cookies from 'universal-cookie';
import { sendMessageAPI } from '../apis/messages/messages';
import { getCurrentProjects } from '../apis/projects/projects';
import { dropdownInitialState, dropdownReducers } from '../state/reducers/dropdownReducer';
import avatar from "../assets/placeholders/avatar.png"
import { useGetDreamProjectsQuery } from '../features/project/projectApi';
import { useGetContentProductsQuery, useGetLocationsQuery, useGetSkillsQuery } from '../features/utils/utilsApi';
import { useSelector } from 'react-redux';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    const { user } = useSelector(state => state.auth);

    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");
    const [searchText, setSearchText] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);
    const [checkedGenres, setcheckedGenres] = useState([]);
    const [checkedLocations, setcheckedLocations] = useState([]);

    const cookies = new Cookies();
    const authToken = cookies.get('auth_token');

    const [shortlistedArtist, setshortlistedArtist] = useState([]);
    const [selectedContentProducts, setselectedContentProducts] = useState("");
    const [chatLog, setchatLog] = useState([]);

    // setting response msg on first action
    useEffect(() => {
        const isExist = chatLog.find(chat => chat.actionResponse);
        if (chatLog.length === 1 && !isExist) {
            setchatLog(chatLog => [...chatLog, { actionResponse: true, msgID: chatLog.length + 1, bot: "Great! Let’s shortlist artist by requirement." }]);
        }
    }, [chatLog]);

    const handleShortlist = (artistID, name, profile_pic) => {
        setshortlistedArtist(current => [...current, artistID]);
        // chatlog
        const message = { type: 'shortlistedArtist', msgID: chatLog.length + 1, artist: { artistID, name, profile_pic } };
        setchatLog(current => [...current, message]);

        // saving shortlisted artist in the db
        if (currentProject?.pk) {
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

    const { data: locations = [] } = useGetLocationsQuery();
    const { data: skills = [] } = useGetSkillsQuery();
    const { data: contentProducts = [] } = useGetContentProductsQuery();

    // get current projects
    const { data: currentProjects = [], refetch: currentProjectsRefetch } = useQuery({
        queryKey: ['currentProjects', user.email],
        queryFn: () => getCurrentProjects(authToken)
    })

    // dream projects
    const { data: dreamProjects = [], refetch: dreamProjectsRefetch } = useGetDreamProjectsQuery();


    // views
    const [viewAs, setViewAs] = useState("large");

    // holding state of create new project
    const createProjectFormInitialState = {
        title: "",
        project_template: "",
        reference_links: "",
        post_project_client_feedback: "",
    }
    const createProjectFormReducer = (state, action) => {
        switch (action.type) {
            case "FORM":
                return { ...state, [action.payload.name]: action.payload.value }
            default:
                return state;
        }
    };
    const [createProjectFormState, createProjectFormDispatch] = useReducer(createProjectFormReducer, createProjectFormInitialState);

    const [showModal, setShowModal] = useState(false);

    // handle select content product login from RightAside

    const sender = (user.role === "Client" || !user.email) ? "user" : "bot";

    //clearing all state of project when selecting different content product
    const clearProject = () => {
        setcurrentProject({});
        setchatLog([]);
        setshortlistedArtist([]);
        setSearchText("");
        setSuggestions([]);
        setRemovedSkill([]);
    }

    const [confirm, setConfirm] = useState(false);

    const handleSelectContentProduct = (product) => {
        const isExist = selectedContentProducts === product.pk;

        if (!isExist && !currentProject?.pk && selectedContentProducts) {
            setShowModal(true);
            if (confirm) {
                clearProject();
            } else {
                return;
            }
        }

        if (!isExist) {
            setselectedContentProducts(product.pk);
            // chatlog
            setchatLog(current => [...current, { msgID: current.length + 1, [sender]: product.name }]);
        }
    }

    const [dropdownState, dropdownDispatch] = useReducer(dropdownReducers, dropdownInitialState);

    const [artistProfile, setArtistProfile] = useState(null);

    const isMobile = window.innerWidth < 768;

    const [removedSkills, setRemovedSkill] = useState([]);

    // for showing chat suggestions (artists skills) when shortlisted an artist
    const [suggestions, setSuggestions] = useState([]);

    const handleSelectSkill = (skill) => {
        setcheckedSkills([skill[1] + '']);
        // chatlog
        setchatLog(current => [...current, { msgID: current.length + 1, [sender]: skill[0] }]);

        // removing suggested skills after click
        setSuggestions(current => current.filter(i => i[1] + '' !== skill[1] + ''));
        setRemovedSkill(current => [...current, skill]);

        setSearchText(skill[0]);
    }



    // for showing chat suggestions (artists skills) when shortlisted an artist
    const artistIDs = shortlistedArtist?.join(",");
    useEffect(() => {
        // if no selectedContentProducts then don't show skills suggestions
        if (!selectedContentProducts || currentProject?.pk) return;

        fetch('https://dev.nsnco.in/api/v1/chatflow_skills/', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                artists: artistIDs,
                product: selectedContentProducts || 0
            })
        })
            .then(res => res.json())
            .then(data => {
                setSuggestions(data.skills);
                // filter on contentProduct's listed skills & show artists depending on those skills
                setcheckedSkills(data.skills.map(skill => skill[1] + ''));
            });
    }, [selectedContentProducts]);

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
        createProjectFormState,
        createProjectFormDispatch,
        handleSelectContentProduct,
        dropdownState,
        dropdownDispatch,
        artistProfile,
        setArtistProfile,
        isMobile,
        avatar,
        suggestions,
        setSuggestions,
        handleSelectSkill,
        removedSkills,
        showModal,
        setShowModal,
        setConfirm
    }

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;