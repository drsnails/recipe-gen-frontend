import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router"
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useFormRegister";
import { checkFields } from "../services/utilService";
import { login, signin } from "../store/actions/userActions";

export function LoginSignup(props) {
    const [isSignin, setIsSignin] = useState(false);
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()

    const [setCreds, creds, register] = useForm({
        username: '',
        password: ''
    })

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
        const missingFields = checkFields(creds)
        if (missingFields) {
            console.log(`Some fields are missing. (${missingFields})`);
        }
        try {
            await dispatch(creds.email ? signin(creds) : login(creds))
            navigate('/')
        } catch (err) {

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

                {!isSignin && <Link className="signin-link" replace to='/signin'>Dont have an account? click here to sign in</Link>}

            </form>
        </div>
    )
}
