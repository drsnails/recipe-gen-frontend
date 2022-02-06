
export function setLoading(isLoading) {
  return async (dispatch) => {
    try {
      return dispatch({ type: 'SET_LOADING', isLoading })
    } catch (err) {
      console.log('err:', err);
      throw err
    }
  }
}


