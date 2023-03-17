import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import avatar from "../assets/placeholders/avatar.png"
import { useGetCurrentProjectsQuery, useGetDreamProjectsQuery, useGetProjectQuery } from '../features/project/projectApi';
import { useGetContentProductsQuery, useGetLocationsQuery, useGetSkillsOnProductSelectMutation, useGetSkillsQuery } from '../features/utils/utilsApi';
import { useDispatch, useSelector } from 'react-redux';
import { useShortlistArtistMutation } from '../features/artist/artistApi';
import { setSearch } from '../features/filter/filterSlice';
import { useSendMessageMutation } from '../features/chat/chatApi';
import { addArtist, addChatLog, setArtist, setChatLog, setContentProduct } from '../features/project/projectSlice';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    const { user } = useSelector(state => state.auth);

    const [shortlistArtist] = useShortlistArtistMutation();
    const { data: locations = [] } = useGetLocationsQuery();
    const { data: skills = [] } = useGetSkillsQuery();
    const { data: contentProducts = [] } = useGetContentProductsQuery();
    const [getSkillsOnProductSelect] = useGetSkillsOnProductSelectMutation();
    const [sendMessage] = useSendMessageMutation();

    const { data: currentProjects = [] } = useGetCurrentProjectsQuery(null, { skip: !user?.email });
    const { data: dreamProjects = [] } = useGetDreamProjectsQuery();

    const [projectID, setProjectID] = useState(null);
    const { data: projectData } = useGetProjectQuery(projectID, { skip: !projectID });

    const { chatLog, selectedContentProduct } = useSelector(state => state.project);
    const dispatch = useDispatch();

    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);
    const [checkedGenres, setcheckedGenres] = useState([]);
    const [checkedLocations, setcheckedLocations] = useState([]);

    // setting response msg on first action
    useEffect(() => {
        const isExist = chatLog.find(chat => chat.actionResponse);
        if (chatLog.length === 1 && !isExist) {
            dispatch(addChatLog({ actionResponse: true, msgID: chatLog.length + 1, bot: "Great! Let’s shortlist artist by requirement." }));
        }
    }, [chatLog]);


    const handleShortlist = (artistID, name, profile_pic) => {
        dispatch(addArtist(artistID));
        // chatlog
        const message = { type: 'shortlistedArtist', msgID: chatLog.length + 1, artist: { artistID, name, profile_pic } };
        dispatch(addChatLog(message));

        // saving shortlisted artist in the db
        if (currentProject?.pk) {
            sendMessage({
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
            dispatch(setChatLog(JSON.parse(projectData.brief)));
            dispatch(setArtist(projectData.shortlisted_artists));
        }
    }, [projectData])


    // views
    const [viewAs, setViewAs] = useState("large");

    const [showModal, setShowModal] = useState(false);

    // handle select content product login from RightAside

    const sender = (user.role === "Client" || !user.email) ? "user" : "bot";

    //clearing all state of project when selecting different content product
    const clearProject = () => {
        setcurrentProject({});
        dispatch(setChatLog([]));
        dispatch(setArtist([]));
        dispatch(setSearch(""));
        setSuggestions([]);
        setRemovedSkill([]);
    }

    const [confirm, setConfirm] = useState(false);

    const handleSelectContentProduct = (product) => {
        const isExist = selectedContentProduct === product.pk;

        if (!isExist && !currentProject?.pk && selectedContentProduct) {
            setShowModal(true);
            if (confirm) {
                clearProject();
            } else {
                return;
            }
        }

        if (!isExist) {
            dispatch(setContentProduct(product.pk));
            // chatlog
            dispatch(addChatLog({ msgID: chatLog.length + 1, [sender]: `You've selected ${product.name}` }));
        }
    }

    const [artistProfile, setArtistProfile] = useState(null);

    const isMobile = window.innerWidth < 768;

    const [removedSkills, setRemovedSkill] = useState([]);

    // for showing chat suggestions (artists skills) when shortlisted an artist
    const [suggestions, setSuggestions] = useState([]);

    const handleSelectSkill = (skill) => {
        setcheckedSkills([skill[1] + '']);
        // chatlog
        dispatch(addChatLog({ msgID: chatLog.length + 1, [sender]: `You've selected ${skill[0]}` }));

        // removing suggested skills after click
        setSuggestions(current => current.filter(i => i[1] + '' !== skill[1] + ''));
        setRemovedSkill(current => [...current, skill]);

        dispatch(setSearch(skill[0]));
    }

    // for showing chat suggestions (artists skills) when shortlisted an artist
    useEffect(() => {
        // if no selectedContentProduct then don't show skills suggestions
        if (!selectedContentProduct || currentProject?.pk) return;

        getSkillsOnProductSelect({ product: selectedContentProduct })
            .then(data => {
                setSuggestions(data?.data?.skills);
                // filter on contentProduct's listed skills & show artists depending on those skills
                setcheckedSkills(data?.data?.skills.map(skill => skill[1] + ''));
            });
    }, [selectedContentProduct]);

    // stored values
    const value = {
        demoType,
        setdemoType,
        checkedSkills,
        setcheckedSkills,
        checkedGenres,
        setcheckedGenres,
        handleShortlist,
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
        handleSelectContentProduct,
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