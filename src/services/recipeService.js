import { httpService } from './httpService.js'
import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const recipeService = {
    query,
    getEmptyRecipe,
    getEmptyIngredient,
    getById,
    update
}

const STORAGE_KEY = 'recipes'
const BASE_URL = 'recipe'

const gDefaultRecipes = [
    {
        _id: 'r1',
        name: 'mango hot sauce',
        createdAt: Date.now(),
        ingredientToScale: 'r101',
        ingredients: [
            { id: 'r101', name: 'habanero', amount: 500, units: 'g' },
            { id: 'r102', name: 'mango', amount: 300, units: 'g' },
            { id: 'r103', name: 'vinegar', amount: 200, units: 'mL' },
            { id: 'r104', name: 'water', amount: 350, units: 'mL' },
        ]
    },

]

var gRecipes = _loadRecipes()

async function query(userId) {
    try {
        return httpService.get(BASE_URL, { userId })
    } catch (err) {
        return
    }
}



// function tryRecipe(id) {
//     const recipe = gRecipes.find(recipe => recipe._id === id)
//     recipe.batteryStatus -= 10
//     return Promise.resolve()
// }

async function getById(id) {
    try {
        return httpService.get(BASE_URL + '/' + id)
    } catch (err) {
        return
    }
}


async function update(recipe) {
    console.log('update -> recipe', recipe)
    try {
        return httpService.put(BASE_URL, recipe)
    } catch (err) {
        return
    }
}


function setIngToScaleId(ingToScaleId) {
    
}

// function remove(id) {
//     const idx = gRecipes.findIndex(recipe => recipe._id === id)
//     gRecipes.splice(idx, 1)
//     if (!gRecipes.length) gRecipes = gDefaultRecipes.slice()
//     storageService.store(STORAGE_KEY, gRecipes)
//     return Promise.resolve()
// }

// function save(recipeToSave) {
//     if (recipeToSave._id) {
//         const idx = gRecipes.findIndex(recipe => recipe._id === recipeToSave._id)
//         gRecipes.splice(idx, 1, recipeToSave)
//     } else {
//         recipeToSave._id = makeId()
//         gRecipes.push(recipeToSave)
//     }
//     storageService.store(STORAGE_KEY, gRecipes)
//     return Promise.resolve(recipeToSave);
// }



function getEmptyRecipe() {
    return {
        name: '',
        createdAt: Date.now(),
        ingredientToScale: '',
        ingredients: [getEmptyIngredient()]
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

function _loadRecipes() {
    let recipes = storageService.load(STORAGE_KEY)
    if (!recipes || !recipes.length) recipes = gDefaultRecipes
    storageService.store(STORAGE_KEY, recipes)
    return recipes
}

