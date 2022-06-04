import { useEffect, useState } from "react"
// import GoogleLogin from "react-google-login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom";
import { GoogleLoginBtn } from "../cmps/GoogleLoginBtn";
import { GoogleLogoutBtn } from "../cmps/GoogleLogoutBtn";
// import { GoogleLogout } from "../cmps/GoogleLogOut";
import { useForm } from "../hooks/useFormRegister";
import { showErrorMsg } from "../services/eventBusService";
import { userService } from "../services/userService";
import { checkFields } from "../services/utilService";
import { setLoading } from "../store/actions/loaderActions";
import { login, signin } from "../store/actions/userActions";

export function LoginSignup(props) {
    const [isSignin, setIsSignin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loggedInUser } = useSelector(state => state.userModule)


    const [creds, setCreds, register] = useForm({
        username: '',
        password: ''
    })

    useEffect(() => {
        // (async () => {
        // })()

        if (loggedInUser) navigate('/')

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


    const onSubmit = async (ev, _creds = creds) => {
        if (ev) {
            ev.stopPropagation()
            ev.preventDefault()
        }
        const missingFields = checkFields(_creds, isSignin)
        if (missingFields) {
            console.log(`Some fields are missing. (${missingFields})`);
            showErrorMsg({ txt: `Some fields are missing. (${missingFields})` })
            return
        }
        try {
            dispatch(setLoading(true))
            if (!_creds.googleId) {
                await dispatch(_creds.email ? signin(_creds) : login(_creds))
            } else {

                const googleUser = await userService.getUserByGoogleId(_creds.googleId)
                if (!googleUser || !googleUser?._id) return await dispatch(signin(_creds))
                await dispatch(login(_creds))
            }

            navigate('/')
        } catch (err) {
            showErrorMsg({ txt: `There was a problem while ${err.type}` })
        } finally {
            dispatch(setLoading(false))
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


                {/* <GoogleLogoutBtn /> */}
                {/* <GoogleLogout/> */}

                <button className="login-btn">{isSignin ? 'Register' : 'Login'}</button>

                {!isSignin ? <Link className="signin-link" replace to='/signin'>Don't have an account? click here to sign up</Link>
                    : <Link className="signin-link" replace to='/login'>Already a user? click here to log in</Link>}

            </form>
            <GoogleLoginBtn txt={`${isSignin ? 'Sign' : 'Log'} in with google`} onSubmit={onSubmit} setCreds={setCreds} />
        </div>
    )
}
