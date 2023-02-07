import Cookies from "universal-cookie";

const useAuthToken = () => {
    const cookies = new Cookies();
    const authToken = cookies.get('auth_token');
    return authToken
}

export default useAuthToken;