import { capitalize } from 'lodash'
import { httpService } from './httpService.js'
import { storageService } from './storageService.js'
import { capitalizeSentence, copyToClipboard, getAmountToScale, makeId } from './utilService.js'

export const recipeService = {
    query,
    getEmptyRecipe,
    getEmptyIngredient,
    getById,
    update,
    save,
    copyRecipeToClipboard
}

const STORAGE_KEY = 'recipes'
const BASE_URL = 'recipe'


async function query(userId) {
    try {
        return httpService.get(BASE_URL, { userId })
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



async function save(recipe, field, value, ingId) {
    try {
        return recipe._id ? httpService.put(BASE_URL, { recipe, field, value, ingId }) : httpService.post(BASE_URL, recipe)
    } catch (err) {
        return
    }
}


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
    recipeTxt += capitalizeSentence(recipe.name) + '\n\n'
    const relativeIng = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
    for (const ingredient of recipe.ingredients) {
        
        const relativeAmount = relativeIng && getAmountToScale(ingredient,relativeIng)
        recipeTxt += capitalize(ingredient.name) + '\t '
        recipeTxt += ingredient.amount + ' ' + ingredient.units + '\t '
        recipeTxt += relativeAmount
        recipeTxt += '\n'
    }

    copyToClipboard(recipeTxt)

}


