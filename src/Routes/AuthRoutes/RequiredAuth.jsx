import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequiredAuth = ({ children }) => {
    const { user, isLoading } = useSelector(state => state.auth);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user.email) {
        return <Navigate to="/" />
    }

    return children;
};

export default RequiredAuth;