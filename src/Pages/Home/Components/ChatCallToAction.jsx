import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRootContext } from "../../../contexts/RootProvider";
import ActionCta from "./ActionCta";
import Cta from "./Cta";

const ChatCallToAction = () => {
    const navigate = useNavigate();
    const { suggestions, removedSkills } = useRootContext();
    const currentProject = useSelector(state => state.project);

    const viewDemos = () => navigate(`/projects/demos/${currentProject?.pk}`);

    const ctaStages = {
        lead: [
            ["View Demos", viewDemos],
            ["Docusign Pending", null, "warning"],
            ["Payment Pending", null, "warning"],
            ["Rate Us"]
        ],
        inProgress: [
            ["Approve"],
            ["Decline"],
            ["Put On Hold"]
        ],
    }

    let suggestionElement;
    if (currentProject?.stage === "Lead") {
        // suggestionElement = <ActionCta suggestions={ctaStages.lead} className='sticky bottom-0' />
        suggestionElement = <ActionCta className='sticky bottom-0' />
    }
    else if (currentProject?.stage === "In Progress") {
        suggestionElement = <ActionCta suggestions={ctaStages.inProgress} className='sticky bottom-0' />
    }
    else {
        suggestionElement = (suggestions?.length > 0 || removedSkills?.length > 0) &&
            <Cta className='sticky bottom-0' />
    }

    return suggestionElement;
};

export default ChatCallToAction;