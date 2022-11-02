import { useNavigate } from "react-router"
import { userService } from "../../services/userService"

export function login(creds) {
  return async (dispatch) => {
    try {
      const user = await userService.login(creds)
      return dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('err:', err);
      throw { err, type: 'login' }
    }
  }
}

export function signin(creds) {
  return async (dispatch) => {
    try {
      const user = await userService.signin(creds)
      return dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('err:', err);
      throw { err, type: 'signin' }

    }
  }
}


export function setUser() {
  return async (dispatch) => {
    try {
      const _user = userService.getLoggedInUser()
      let user = await userService.getUserFromSession()
      user = user || _user
      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        return dispatch({ type: 'SET_USER', user })
      }
    } catch (err) {
      console.log('err:', err);

    }
  }
}
export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      return dispatch({
        type: 'SET_USER',
        user: null,
      });
    } catch (err) {
      console.log('Could not logout', err);
      throw err
    }
  };
}