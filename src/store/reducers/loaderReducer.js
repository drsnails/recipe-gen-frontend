const INITIAL_STATE = {
    isLoading: false
}

export function loaderReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        
        default:
            return state;
    }
}