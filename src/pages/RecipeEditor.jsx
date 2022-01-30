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

    const getIngredientToScale = useCallback((recipe) => {
        const ingToScale = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
        return ingToScale
    }, [recipe]);

    const onChangeIngToScale = async (ingToScaleId) => {
        const recipeToSave = { ...recipe, ingToScaleId }
        await recipeService.update(recipeToSave)
        setRecipe(recipeToSave)
    }

    const handleChange = async ({ target }, ingredient) => {
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

        await recipeService.update(recipeToSave)
        setRecipe(recipeToSave)

    }


    const addIngredient = async () => {
        const ingToAdd = recipeService.getEmptyIngredient()
        const recipeToSave = {
            ...recipe,
            ingredients: [...recipe.ingredients, ingToAdd]
        }
        await recipeService.update(recipeToSave)
        setRecipe(recipeToSave)
    }

    const handleEditable = ({ target }) => {
        console.log('target:', target);
    }

    if (!recipe) return <div>Loading...</div>
    const ingToScale = getIngredientToScale(recipe)
    return (
        <div className='recipe-editor'>
            <h2>{recipe.name}</h2>
            <br />
            <IngList addIngredient={addIngredient} handleEditable={handleEditable} handleChange={handleChange} ingredients={recipe.ingredients} ingToScale={ingToScale} onChangeIngToScale={onChangeIngToScale} />
        </div>
    );
}
