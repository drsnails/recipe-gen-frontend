
import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenSetup } from '../services/utilService';
import { setUser } from '../store/actions/userActions';
// refresh token

// const clientId =
//   '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';
const clientId = '207535718576-hdkb870gloso3ln5s90rrd1rfkjl62g2.apps.googleusercontent.com'

export function GoogleLoginBtn({ onSubmit, setCreds, txt }) {

  const dispatch = useDispatch()
  const { loggedInUser } = useSelector(state => state.userModule)

  const onSuccess = async (res) => {
    const user = {
      email: res.profileObj.email,
      username: res.profileObj.name,
      password: res.profileObj.googleId,
      googleId: res.profileObj.googleId,
      isGoogle: true
    }
    await onSubmit(null, user)
    if (!loggedInUser || loggedInUser.email !== user.email) {
      dispatch(setUser())
    }
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    console.table(res.details)
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText={txt}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}
