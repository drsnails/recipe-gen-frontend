import { httpService } from './httpService.js'
import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const recipeService = {
    query,
    getEmptyRecipe,
    getEmptyIngredient,
    getById,
    update,
    save
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
        ingredients: [firstIng]
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


