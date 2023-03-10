import useAuthToken from '../../hooks/useAuthToken';

export const sendMessageAPI = async (message) => {
    const authToken = useAuthToken();

    if (!authToken) return {};

    const response = await fetch('https://dev.nsnco.in/api/v1/create_project/', {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            Authorization: `token ${authToken}`
        },
        body: JSON.stringify(message)
    })

    const data = await response.json();

    return data;
}