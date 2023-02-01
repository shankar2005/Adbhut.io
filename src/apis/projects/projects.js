import axios from "axios";

export const getCurrentProjects = async (authToken) => {
    const response = await axios('https://dev.nsnco.in/api/v1/get_my_projects/', {
        headers: { Authorization: `token ${authToken}` },
    });
    return response.data;
}

export const getDreamProjects = async () => {
    const response = await axios('https://dev.nsnco.in/api/v1/get_dreamproject/');
    return response.data;
}