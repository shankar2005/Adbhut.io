import { createContext, useContext, useEffect, useState } from 'react';
import { useGetCurrentProjectsQuery, useGetProjectQuery } from '../features/project/projectApi';
import { useGetContentProductsQuery, useGetSkillsOnProductSelectMutation, useGetSkillsQuery } from '../features/utils/utilsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../features/filter/filterSlice';
import { clearProject, setContentProduct, setProjectData } from '../features/project/projectSlice';

const RootContext = createContext();

const RootProvider = ({ children }) => {
    const { user } = useSelector(state => state.auth);
    const avatar = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

    const { data: skills = [] } = useGetSkillsQuery();
    const { data: contentProducts = [] } = useGetContentProductsQuery();
    const [getSkillsOnProductSelect] = useGetSkillsOnProductSelectMutation();

    const { data: currentProjects = [] } = useGetCurrentProjectsQuery(null, { skip: !user?.email });

    const { selectedContentProduct } = useSelector(state => state.project);
    const currentProject = useSelector(state => state.project);

    const dispatch = useDispatch();

    // filtering feeds with type -> search bar
    const [demoType, setdemoType] = useState("");

    const [checkedSkills, setcheckedSkills] = useState([]);
    const [checkedGenres, setcheckedGenres] = useState([]);
    const [checkedLocations, setcheckedLocations] = useState([]);

    // views
    const [viewAs, setViewAs] = useState("large");

    const [showModal, setShowModal] = useState(false);

    // handle select content product login from RightAside

    const sender = (user.role === "Client" || !user.email) ? "user" : "bot";

    //clearing all state of project when selecting different content product
    const clearCurrentProject = () => {
        dispatch(clearProject());
        setSuggestions([]);
        setRemovedSkill([]);
    }

    const [confirm, setConfirm] = useState(false);
    const [changeContentProduct, setChangeContentProduct] = useState(null);

    const handleSelectContentProduct = (product) => {
        const isExist = selectedContentProduct === product.pk;

        if (!isExist && !currentProject?.pk && selectedContentProduct) {
            setShowModal(true);
            setChangeContentProduct(product);
            if (!confirm) {
                return;
            }
        }

        if (!isExist) {
            dispatch(setContentProduct(product.pk));
        }
    }

    useEffect(() => {
        if (confirm) {
            clearCurrentProject();
            dispatch(setContentProduct(changeContentProduct.pk));
            setConfirm(false);
        }
    }, [confirm])

    const [artistProfile, setArtistProfile] = useState(null);

    const isMobile = window.innerWidth < 768;

    const [removedSkills, setRemovedSkill] = useState([]);

    // for showing chat suggestions (artists skills) when shortlisted an artist
    const [suggestions, setSuggestions] = useState([]);

    const handleSelectSkill = (skill) => {
        setcheckedSkills([skill[1] + '']);

        // removing suggested skills after click
        setSuggestions(current => current.filter(i => i[1] + '' !== skill[1] + ''));
        setRemovedSkill(current => [...current, skill]);

        // clear
        setPage(1);
        setArtists([]);
        // clear

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

    const handleClearFilter = () => {
        getSkillsOnProductSelect({ product: selectedContentProduct })
            .then(data => {
                setSuggestions(data?.data?.skills);
            });
        setRemovedSkill([]);

        // clear
        dispatch(setSearch(""));
        setPage(1);
        setArtists([]);
        // clear
    }

    // 
    // 
    // 
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const { data: currentProjectData = {}, refetch: currentProjectRefetch } = useGetProjectQuery(currentProjectId, { skip: !currentProjectId });
    useEffect(() => {
        const value = sessionStorage.getItem("CURRENT_PROJECT")
        if (value) {
            setCurrentProjectId(value)
        }
    }, [currentProjectData])

    useEffect(() => {
        if (currentProjectData.pk) {
            dispatch(setProjectData({
                shortlistedArtists: currentProjectData.shortlisted_artists_details?.map(artist => artist.id),
                selectedContentProduct: currentProjectData.project_template,
                ...currentProjectData
            }))
        }
    }, [currentProjectData])
    // 
    // 
    // 

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [artists, setArtists] = useState([]);

    const [showChat, setShowChat] = useState(false);

    // stored values
    const value = {
        demoType,
        setdemoType,
        checkedSkills,
        setcheckedSkills,
        checkedGenres,
        setcheckedGenres,
        checkedLocations,
        setcheckedLocations,
        skills,
        currentProjects,
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
        setConfirm,
        handleClearFilter,
        setRemovedSkill,
        currentProjectRefetch,
        isModalOpen,
        setIsModalOpen,
        page,
        setPage,
        artists,
        setArtists,
        showChat,
        setShowChat,
    }

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);

export default RootProvider;