const INITIAL_STATE = {
    recipes: null,
    currRecipe: null,
}

export function recipeReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_RECIPES':
            return {
                ...state,
                recipes: [...action.recipes]
            };

        default:
            return state;
    }

}