import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { userService } from '../services/userService';

export const PrivateRoute = ({ children, admin }) => {
    // const { loggedInUser } = useSelector(state => state.userModule)
    const loggedInUser = userService.getLoggedInUser()
    return !!loggedInUser ? children : <Navigate to={'/login'} />;
};
