import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faPepperHot } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../store/actions/userActions';


export function AppHeader() {
    const navigate = useNavigate()
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()



    const onLogOut = async (ev) => {
        ev.stopPropagation()
        await dispatch(logout())
        navigate('/login')
    }

    return (

        <header className='app-header'>
            <section className='container'>
                <h3 onClick={() => navigate('/')} className='logo'><FontAwesomeIcon icon={faPepperHot} /></h3>
                

                <nav>
                    {loggedInUser ?
                        <section className='user'>
                            <p>Hello, {loggedInUser.username}</p>
                            <button onClick={onLogOut} >Logout</button>
                        </section> :
                        <NavLink to={'login'}>
                            Login
                        </NavLink>
                    }

                </nav>

            </section>
        </header>
    );
}
