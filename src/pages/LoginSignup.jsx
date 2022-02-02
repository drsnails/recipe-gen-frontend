import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useFormRegister";
import { showErrorMsg } from "../services/eventBusService";
import { userService } from "../services/userService";
import { checkFields } from "../services/utilService";
import { login, signin } from "../store/actions/userActions";

export function LoginSignup(props) {
    const [isSignin, setIsSignin] = useState(false);
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()
    const { loggedInUser } = useSelector(state => state.userModule)


    const [creds, setCreds,register] = useForm({
        username: '',
        password: ''
    })

    useEffect(() => {
        (async () => {
            if (loggedInUser) navigate('/')
        })()

    }, [loggedInUser]);


    useEffect(() => {
        const isSignin = location.pathname === '/signin'
        setIsSignin(isSignin)
        if (isSignin) {
            setCreds({
                email: '',
                username: '',
                password: ''
            })
        }

    }, [location.pathname]);


    const onSubmit = async (ev) => {
        ev.stopPropagation()
        ev.preventDefault()
        const missingFields = checkFields(creds, isSignin)
        if (missingFields) {
            console.log(`Some fields are missing. (${missingFields})`);
            showErrorMsg({ txt: `Some fields are missing. (${missingFields})` })
            return
        }
        try {
            await dispatch(creds.email ? signin(creds) : login(creds))
            navigate('/')
        } catch (err) {
            showErrorMsg({ txt: `There was a problem while ${err.type}` })
        }

    }




    return (

        <div className="login-signup">
            <h3>{isSignin ? 'Sign' : 'Log'} in</h3>
            <form onSubmit={onSubmit} >
                {isSignin && <section>
                    <input autoComplete="" {...register('email', 'email')} placeholder="Email" />
                </section>}
                <section>
                    <input autoComplete="" {...register('username')} placeholder="Username" />
                </section>
                <section>
                    <input autoComplete="" {...register('password', 'password')} placeholder="Password" />
                </section>

                <button className="login-btn">{isSignin ? 'Register' : 'Login'}</button>

                {!isSignin ? <Link className="signin-link" replace to='/signin'>Don't have an account? click here to sign up</Link>
                    : <Link className="signin-link" replace to='/login'>Already a user? click here to log in</Link>}

            </form>
        </div>
    )
}
