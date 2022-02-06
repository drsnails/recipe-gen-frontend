import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '921822039990-rpkd86hvajhdehrej1fk5f10ovf2ka0i.apps.googleusercontent.com';
// const clientId = '207535718576-hdkb870gloso3ln5s90rrd1rfkjl62g2.apps.googleusercontent.com'


export function GoogleLogoutBtn({ onSubmit, setCreds }) {
  const onSuccess = (res) => {
    
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}
