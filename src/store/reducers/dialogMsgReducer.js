const INITIAL_STATE = {
    dialogData: null,
    successCb: () => { },
    failCb: () => { },
}

export function dialogMsgReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_DIALOG_OPEN':
            return {
                ...state,
                successCb: action.successCb,
                failCb: action.failCb,
                dialogData: {
                    ...state.dialogData,
                    title: action.title,
                    txt: action.txt
                }
            }
        case 'SET_DIALOG_CLOSE':
            return {
                ...state,
                dialogData: null,
                successCb: () => { },
                failCb: () => { },
            }

        default:
            return state;
    }
}