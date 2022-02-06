import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store/actions/userActions';

// const clientId =
//   '921822039990-rpkd86hvajhdehrej1fk5f10ovf2ka0i.apps.googleusercontent.com';
const clientId = '207535718576-hdkb870gloso3ln5s90rrd1rfkjl62g2.apps.googleusercontent.com'


export function GoogleLogoutBtn({ onSubmit, setCreds }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSuccess = async (res) => {
    await dispatch(logout())
    navigate('/login')
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        className='logout-btn'
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}
