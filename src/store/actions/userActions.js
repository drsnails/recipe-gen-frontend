import { useNavigate } from "react-router"
import { userService } from "../../services/userService"

export function login(creds) {
  return async (dispatch) => {
    try {
      const user = await userService.login(creds)
      return dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('err:', err);
    }
  }
}

export function signin(creds) {
  return async (dispatch) => {
    try {
      const user = await userService.signin(creds)
      console.log('return -> user', user)
      return dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('err:', err);

    }
  }
}


export function setUser() {
  return async (dispatch) => {
    try {
      const user = userService.getLoggedInUser()
      

      if (user) {

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
    }
  };
}