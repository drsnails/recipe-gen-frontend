import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/actions/userActions';


export function AppHeader() {
    const navigate = useNavigate()
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()



    const onLogOut = async () => {
        await dispatch(logout())
        navigate('/')
    }

    return (
        
        <header className='app-header'>
            <section className='container'>
                <h3 onClick={() => navigate('/')} className='logo'>Recipe</h3>
                {loggedInUser && <section className='user'>
                    {loggedInUser.username}
                    <button onClick={onLogOut} >logout</button>
                </section>}
                <nav>
                    <NavLink to={'login'}>
                        Login
                    </NavLink>

                </nav>

            </section>
        </header>
    );
}
