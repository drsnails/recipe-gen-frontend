
export function setDialogOpen({ txt, title, successCb = () => { }, failCb = () => { } }) {
  return async (dispatch) => {
    try {
      return dispatch({ type: 'SET_DIALOG_OPEN', txt, title, successCb, failCb })
    } catch (err) {
      console.log('err:', err);
      throw err
    }
  }
}

export function setDialogClose(txt, title) {
  return async (dispatch) => {
    try {
      return dispatch({ type: 'SET_DIALOG_CLOSE' })
    } catch (err) {
      console.log('err:', err);
      throw err
    }
  }
}

