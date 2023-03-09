export const getCurrentProjects = async (authToken) => {
    if (!authToken) return {};

    const res = await fetch('https://dev.nsnco.in/api/v1/all_projects/', {
        headers: { Authorization: `token ${authToken}` },
    });
    const data = await res.json();

    return data;
}