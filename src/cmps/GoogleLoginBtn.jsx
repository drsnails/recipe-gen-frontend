
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../services/utilService';
// refresh token

// const clientId = '207535718576-hdkb870gloso3ln5s90rrd1rfkjl62g2.apps.googleusercontent.com'
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

export function GoogleLoginBtn({ onSubmit, setCreds }) {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    const user = {
      email: res.profileObj.email,
      username: res.profileObj.name,
      password: res.profileObj.googleId,
      googleId: res.profileObj.googleId,
      isGoogle: true
    }
    onSubmit(null, user)
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
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
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}
