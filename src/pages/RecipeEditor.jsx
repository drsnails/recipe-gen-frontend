import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IngList } from "../cmps/IngList";
import { useForm } from "../hooks/useFormRegister";
import { showErrorMsg, showSuccessMsg } from "../services/eventBusService";
import { recipeService } from "../services/recipeService";
import { userService } from "../services/userService";
import { reOrderList, selectText, sleep } from "../services/utilService";
var cloneDeep = require('lodash.clonedeep');

export default function RecipeEditor() {
    const [recipe, setRecipe] = useState();
    const [ingToRemoveIdx, setIngToRemoveIdx] = useState(null);
    const [numOfDishes, setNumOfDishes] = useState('');


    const params = useParams()
    useEffect(() => {

        loadRecipe()
    }, [params.id]);




    const loadRecipe = async () => {
        const recipe = params.id ? await recipeService.getById(params.id) : recipeService.getEmptyRecipe()
        // getIngredientToScale(recipe)
        setRecipe(recipe)
    }

    const saveRecipe = async (recipeToSave, field, value, ingId) => {

        const oldRecipe = cloneDeep(recipe)
        try {
            setRecipe(recipeToSave)
            await recipeService.save(recipeToSave, field, value, ingId)
            // * if field is null thats means were removing an ingredient

            // setIngToRemoveIdx(null)

        } catch (err) {
            console.log('cant save recipe: ', err);
            setRecipe(oldRecipe)
        } finally {
        }
    }

    const getIngredientToScale = useCallback((recipe) => {
        const ingToScale = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
        return ingToScale
    }, [recipe]);

    const onChangeRecipeData = async (field, value) => {
        const recipeToSave = { ...recipe, [field]: value }
        saveRecipe(recipeToSave, field, value)
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

        await saveRecipe(recipeToSave, field, value, ingredient.id)


    }

    const handleNumOfDishesChange = ({ target }) => {
        let value = +target.value
        console.log('handleNumOfDishesChange -> value', value)
        console.log('numsOfDishes:', numOfDishes);
        
        if ( !value || value < 0) value = ''
        setNumOfDishes(value)

    }




    const addIngredient = async () => {
        const ingToAdd = recipeService.getEmptyIngredient()
        ingToAdd.isNew = true
        console.log('addIngredient -> ingToAdd', ingToAdd)
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
        if (recipe.ingToScaleId === ingId) {
            recipe.ingToScaleId = ''
        }
        saveRecipe(recipeToSave, null, null, ingId)
    }


    // const handleChange = ({ target }) => {
    //   const field = target.name
    //   const value = target.type === 'number' ? +target.value : target.value
    //   setFields(fields => ({ ...fields, [field]: value }))

    // }


    const onReOrderIngs = (result) => {
        const { index: destIdx } = result.destination
        const { index: sourceIdx } = result.source
        let ingredients = [...recipe.ingredients]
        ingredients = reOrderList(ingredients, destIdx, sourceIdx)
        const recipeToSave = {
            ...recipe,
            ingredients: ingredients
        }

        saveRecipe(recipeToSave, null, null)

    }

    const onCopyToClipBoard = () => {
        recipeService.copyRecipeToClipboard(recipe)
        showSuccessMsg({ txt: 'Copied to clipboard' })
    }


    if (!recipe) return <div>Loading...</div>
    const ingToScale = getIngredientToScale(recipe)
    return (
        <div className='recipe-editor'>
            <section className="title-container">
                <h2 onFocus={selectText} onBlur={({ target }) => onChangeRecipeData('name', target.innerText)} contentEditable suppressContentEditableWarning={true} >{recipe.name}</h2>
                <button className="btn copy" onClick={onCopyToClipBoard}>Copy To Clipboard</button>
            </section>
            <section className="title-edit">
                <strong className="ingredients">Ingredients</strong>
                <form className="nice-form">
                    <div className="form__group field dishes-form">
                        <input value={numOfDishes} onChange={handleNumOfDishesChange} type="number" id="numOfDishes" name="numOfDishes" className="form__field" placeholder="Search by recipe or ingredient" />
                        <label htmlFor="numOfDishes" className="form__label">Number Of Dishes</label>
                    </div>
                </form>
            </section>
            <IngList
                removeIngredient={removeIngredient}
                addIngredient={addIngredient}
                handleIngChange={handleIngChange}
                ingredients={recipe.ingredients}
                ingToScale={ingToScale}
                onChangeRecipeData={onChangeRecipeData}
                ingToRemoveIdx={ingToRemoveIdx}
                onReOrderIngs={onReOrderIngs}
                numOfDishes={numOfDishes}
            />


            <section className="instructions">
                {/* <section className="gap"></section> */}

                <strong className="instructions-title">Instructions</strong>
                <textarea onChange={(({ target }) => onChangeRecipeData('instructions', target.value))} value={recipe.instructions} name="instructions" id="" cols="30" rows="30"></textarea>
            </section>

        </div>
    );
}
