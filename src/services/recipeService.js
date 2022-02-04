import { capitalize } from 'lodash'
import { httpService } from './httpService.js'
import { storageService } from './storageService.js'
import { capitalizeSentence, copyToClipboard, getAmountToScale, makeId } from './utilService.js'

export const recipeService = {
    query,
    getEmptyRecipe,
    getEmptyIngredient,
    getById,
    remove,
    update,
    save,
    copyRecipeToClipboard
}

const STORAGE_KEY = 'recipes'
const BASE_URL = 'recipe'


async function query(userId, filterBy) {
    try {
        return httpService.get(BASE_URL, { userId, filterBy })
    } catch (err) {
        return
    }
}



async function getById(id) {
    try {
        return httpService.get(BASE_URL + '/' + id)
    } catch (err) {
        return
    }
}





async function remove(recipeId) {
    try {
        return httpService.delete(`${BASE_URL}/${recipeId}`)
    } catch (err) {
        return
    }
}


/*TEST START*/
async function save(data, type) {
    try {
        return data?.recipe._id ? httpService.put(BASE_URL, {data, type}) : httpService.post(BASE_URL, data.recipe)
    } catch (err) {
        return
    }
}
/*TEST END*/



/*ORIGINAL START*/
// async function save(recipe, field, value, ingId) {
//     try {
//         return recipe._id ? httpService.put(BASE_URL, { recipe, field, value, ingId }) : httpService.post(BASE_URL, recipe)
//     } catch (err) {
//         return
//     }
// }
/*ORIGINAL END*/




async function update(recipe) {
    try {
        return httpService.put(BASE_URL, recipe)
    } catch (err) {
        return
    }
}




function getEmptyRecipe() {
    const firstIng = getEmptyIngredient()
    return {
        name: 'New Recipe',
        createdAt: Date.now(),
        ingToScaleId: firstIng.id,
        ingredients: [firstIng],
        instructions: ''
    }
}

function getEmptyIngredient() {
    return {
        id: makeId(),
        name: 'ingredient',
        amount: 1,
        units: 'g'
    }
}


function copyRecipeToClipboard(recipe) {
    let recipeTxt = ''
    recipeTxt += capitalizeSentence(recipe.name) + '\n\n\n'
    const relativeIng = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
    for (const ingredient of recipe.ingredients) {

        const relativeAmount = relativeIng && getAmountToScale(ingredient, relativeIng)
        recipeTxt += capitalize(ingredient.name) + '\t\t '
        recipeTxt += ingredient.amount + ' ' + ingredient.units + '\t\t '
        recipeTxt += relativeAmount
        recipeTxt += '\n\n'
    }

    copyToClipboard(recipeTxt)

}


