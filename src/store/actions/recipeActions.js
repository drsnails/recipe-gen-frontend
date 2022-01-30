import { recipeService } from "../../services/recipeService"

export function loadRecipes(userId) {
    return async (dispatch, getState) => {
        // const { filterBy } = getState().recipeModule
        try {
            const recipes = await recipeService.query(userId)
            console.log('return -> recipes', recipes)
            return recipes
        } catch (err) {
            console.log(err);
        }
    }
}

