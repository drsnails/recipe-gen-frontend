import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { userService } from '../services/userService';

export const PrivateRoute = ({ children, admin }) => {
    const { loggedInUser } = useSelector(state => state.userModule)
    return !!loggedInUser ? children : <Navigate to={'/login'} />;
};
