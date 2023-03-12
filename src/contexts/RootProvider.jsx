import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import Cookies from 'universal-cookie';
import { sendMessageAPI } from '../apis/messages/messages';
import { dropdownInitialState, dropdownReducers } from '../state/reducers/dropdownReducer';
import avatar from "../assets/placeholders/avatar.png"
import { useGetCurrentProjectsQuery, useGetDreamProjectsQuery, useGetProjectQuery } from '../features/project/projectApi';
import { useGetContentProductsQuery, useGetLocationsQuery, useGetSkillsOnProductSelectMutation, useGetSkillsQuery } from '../features/utils/utilsApi';
import { useSelector } from 'react-redux';
import { useShortlistArtistMutation } from '../features/artist/artistApi';
import { setSearch } from '../features/filter/filterSlice';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    const [shortlistArtist] = useShortlistArtistMutation();
    const { data: locations = [] } = useGetLocationsQuery();
    const { data: skills = [] } = useGetSkillsQuery();
    const { data: contentProducts = [] } = useGetContentProductsQuery();
    const [getSkillsOnProductSelect] = useGetSkillsOnProductSelectMutation();

    const { data: currentProjects = [] } = useGetCurrentProjectsQuery();
    const { data: dreamProjects = [] } = useGetDreamProjectsQuery();

    const [projectID, setProjectID] = useState(null);
    const { data: projectData } = useGetProjectQuery(projectID, { skip: !projectID });

    const { user } = useSelector(state => state.auth);

    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");

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
            shortlistArtist({
                projectId: currentProject.pk,
                artistId: artistID
            })
        }
    }

    // show project history on click
    const [currentProject, setcurrentProject] = useState(null);
    const handleShowProjectHistory = (projectID) => {
        setProjectID(projectID);
    }
    useEffect(() => {
        if (projectData?.pk) {
            setcurrentProject(projectData);
            setchatLog(JSON.parse(projectData.brief));
            setshortlistedArtist(projectData.shortlisted_artists);
        }
    }, [projectData])




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
        dispatch(setSearch(""));
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

        dispatch(setSearch(skill[0]));
    }

    // for showing chat suggestions (artists skills) when shortlisted an artist
    useEffect(() => {
        // if no selectedContentProducts then don't show skills suggestions
        if (!selectedContentProducts || currentProject?.pk) return;

        getSkillsOnProductSelect({ product: selectedContentProducts })
            .then(data => {
                setSuggestions(data?.data?.skills);
                // filter on contentProduct's listed skills & show artists depending on those skills
                setcheckedSkills(data?.data?.skills.map(skill => skill[1] + ''));
            });
    }, [selectedContentProducts]);

    // stored values
    const value = {
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