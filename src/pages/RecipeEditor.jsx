import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IngList } from "../cmps/IngList";
import { recipeService } from "../services/recipeService";

export default function RecipeEditor() {
    const [recipe, setRecipe] = useState();

    const params = useParams()
    useEffect(() => {

        loadRecipe()
    }, [params.id]);

    const loadRecipe = async () => {
        const recipe = params.id ? await recipeService.getById(params.id) : recipeService.getEmptyRecipe()
        console.log('loadRecipe -> recipe', recipe)
        // getIngredientToScale(recipe)
        setRecipe(recipe)
    }

    const saveRecipe = async (recipeToSave) => {
        await recipeService.save(recipeToSave)
        setRecipe(recipeToSave)
    }

    const getIngredientToScale = useCallback((recipe) => {
        console.log('getIngredientToScale -> recipe', recipe)
        const ingToScale = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
        return ingToScale
    }, [recipe]);

    const onChangeRecipeData = async (field, value) => {
        const recipeToSave = { ...recipe, [field]: value }
        saveRecipe(recipeToSave)
    }

    const handleIngChange = async ({ target }, ingredient) => {
        let field, value
        field = target.name
        value = target.value

        if (target.nodeName !== 'SELECT' && target.nodeName !== 'INPUT') {
            field = target.dataset.name
            value = target.innerText

            if (field === 'amount') {
                value = +value
                if (!value) {
                    value = ingredient.amount
                    target.innerText = value
                    return
                }
            }

            if (value === ingredient[field]) return
        }

        const ingToSave = { ...ingredient, [field]: value }
        const recipeToSave = {
            ...recipe,
            ingredients: recipe.ingredients.map(ing => ing.id === ingredient.id ? ingToSave : ing)
        }

        saveRecipe(recipeToSave)

    }




    const addIngredient = async () => {
        const ingToAdd = recipeService.getEmptyIngredient()
        const recipeToSave = {
            ...recipe,
            ingredients: [...recipe.ingredients, ingToAdd]
        }
        saveRecipe(recipeToSave)
    }

    const removeIngredient = async (ingId) => {
        const recipeToSave = {
            ...recipe,
            ingredients: recipe.ingredients.filter(ing => ing.id !== ingId)
        }
        saveRecipe(recipeToSave)
    }


    if (!recipe) return <div>Loading...</div>
    const ingToScale = getIngredientToScale(recipe)
    return (
        <div className='recipe-editor'>
            <h2 onBlur={({ target }) => onChangeRecipeData('name', target.innerText)} contentEditable suppressContentEditableWarning={true} >{recipe.name}</h2>
            <br />
            <IngList
                removeIngredient={removeIngredient}
                addIngredient={addIngredient}
                handleIngChange={handleIngChange}
                ingredients={recipe.ingredients}
                ingToScale={ingToScale}
                onChangeRecipeData={onChangeRecipeData}
            />
        </div>
    );
}
