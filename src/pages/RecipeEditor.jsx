import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { IngList } from "../cmps/IngList";
import { RecipeImg } from "../cmps/RecipeImg";
import { useForm } from "../hooks/useFormRegister";
import { showErrorMsg, showSuccessMsg } from "../services/eventBusService";
import { recipeService } from "../services/recipeService";
import { userService } from "../services/userService";
import { reOrderList, selectText, sleep } from "../services/utilService";
import { setLoading } from "../store/actions/loaderActions";

var cloneDeep = require('lodash.clonedeep');

export default function RecipeEditor() {
    const [recipe, setRecipe] = useState();
    const [ingToRemoveIdx, setIngToRemoveIdx] = useState(null);
    const [numOfDishes, setNumOfDishes] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const dispatch = useDispatch()


    const params = useParams()
    useEffect(() => {

        loadRecipe()
    }, [params.id]);




    const loadRecipe = async () => {
        const recipe = params.id ? await recipeService.getById(params.id) : recipeService.getEmptyRecipe()
        // getIngredientToScale(recipe)

        setRecipe(recipe)

    }

    /*TEST START*/
    const saveRecipe = async (data, type) => {
        const { recipe } = data
        const oldRecipe = cloneDeep(recipe)
        try {
            // dispatch(setLoading(true))
            setRecipe(recipe)

            await recipeService.save(data, type)
            return 'res'
            // * if field is null thats means were removing an ingredient
            // setIngToRemoveIdx(null)

        } catch (err) {
            console.log('cant save recipe: ', err);
            setRecipe(oldRecipe)
            throw err
        } finally {
            dispatch(setLoading(false))

        }
    }

    /*TEST END*/




    /*ORIGINAL START*/
    // const saveRecipe = async (recipeToSave, field, value, ingId) => {

    //     const oldRecipe = cloneDeep(recipe)
    //     try {
    //         setRecipe(recipeToSave)
    //         await recipeService.save(recipeToSave, field, value, ingId)
    //         // * if field is null thats means were removing an ingredient

    //         // setIngToRemoveIdx(null)

    //     } catch (err) {
    //         console.log('cant save recipe: ', err);
    //         setRecipe(oldRecipe)
    //     } finally {
    //     }
    // }
    /*ORIGINAL END*/

    const getIngredientToScale = useCallback((recipe) => {
        const ingToScale = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
        return ingToScale
    }, [recipe]);

    const onChangeRecipeData = async (field, value) => {
        console.log('recipe:', recipe);
        
        const recipeToSave = { ...recipe, [field]: value }
        // if (!isEdited) setIsEdited(true)
        console.log('onChangeRecipeData -> recipeToSave', recipeToSave)
        if (field === 'ingToScaleId' || field === 'imgUrl') {
            saveRecipe({ recipe: recipeToSave, field, value }, 'updateRecipe')
        } else {
            triggerSaveBtn(recipeToSave)
        }

    }

    const handleIngChange = async (ev, ingredient) => {
        const { target } = ev
        let field, value
        field = target.name
        value = target.value
        if (target.nodeName !== 'SELECT' && target.nodeName !== 'INPUT') {
            field = target.dataset.name
            value = target.innerText
            if (value.includes('\n')) return
            if (field === 'amount') {
                value = +value
                if (!value) {
                    value = ingredient.amount
                    target.innerText = value
                    return
                }
            }
        }

        if (value === ingredient[field]) return

        const ingToSave = { ...ingredient, [field]: value }
        const recipeToSave = {
            ...recipe,
            ingredients: recipe.ingredients.map(ing => ing.id === ingredient.id ? ingToSave : ing)
        }


        if (field === 'units' && value === 'units' && recipeToSave.ingToScaleId === ingToSave.id) {
            return showErrorMsg({ txt: "Can't change main relative quantity to 'Units'" })
        }

        triggerSaveBtn(recipeToSave)

    }


    const onSaveRecipe = async () => {
        try {
            setIsEdited(false)
            await saveRecipe({ recipe }, 'general')
            showSuccessMsg({ txt: 'Recipe saved', time: 2000 })
        } catch (err) {
            showErrorMsg({ txt: 'Saving recipe failed', time: 2000 })
        }
    }



    const triggerSaveBtn = (recipeToSave) => {
        setRecipe(recipeToSave)
        if (!isEdited) {
            setIsEdited(true)
            setIsMounted(true)
        }
    }

    const handleNumOfDishesChange = ({ target }) => {
        let value = +target.value
        console.log('handleNumOfDishesChange -> value', value)
        console.log('numsOfDishes:', numOfDishes);

        if (!value || value < 0) value = ''
        setNumOfDishes(value)

    }




    const addIngredient = async () => {
        const ingToAdd = recipeService.getEmptyIngredient()
        ingToAdd.isNew = true
        const recipeToSave = {
            ...recipe,
            ingredients: [...recipe.ingredients, ingToAdd]
        }
        // saveRecipe({ recipe: recipeToSave }, 'general')
        triggerSaveBtn(recipeToSave)
    }

    const removeIngredient = async (ingId) => {


        const recipeToSave = {
            ...recipe,
            ingredients: recipe.ingredients.filter(ing => ing.id !== ingId)
        }
        if (recipe.ingToScaleId === ingId) {
            recipe.ingToScaleId = ''
        }

        triggerSaveBtn(recipeToSave)
    }


    const onChangeRecipeImg = async (imgUrl) => {
        if (!imgUrl) return
        await onChangeRecipeData('imgUrl', imgUrl)
        dispatch(setLoading(false))
        // setIsEdited(false)


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
        if (!isEdited) {
            saveRecipe({ recipe: recipeToSave }, 'general')

        } else {
            setRecipe(recipeToSave)
        }
    }

    const onCopyToClipBoard = () => {
        recipeService.copyRecipeToClipboard(recipe)
        showSuccessMsg({ txt: 'Copied to clipboard' })
    }


    if (!recipe) return <div>Loading...</div>
    const ingToScale = getIngredientToScale(recipe)
    const floatBtnClass = isEdited ? 'animate-in' : 'animate-out'
    return (
        <div className='recipe-editor'>
            <section className="title-container">
                <h2 onFocus={selectText} onBlur={({ target }) => onChangeRecipeData('name', target.innerText)} contentEditable suppressContentEditableWarning={true} >{recipe.name}</h2>
                <button className="btn copy" onClick={onCopyToClipBoard}>Copy To Clipboard</button>
            </section>
            <RecipeImg imgUrl={recipe.imgUrl} isEdited={isEdited} onChangeImg={onChangeRecipeImg} />
            <section className="title-edit">
                <strong className="ingredients">Ingredients</strong>
                <form onSubmit={ev => ev.preventDefault()} className="nice-form">
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


            {/* <section className="gap"></section> */}
            <section className="instructions">

                <strong className="instructions-title">Instructions</strong>
                <textarea onClick={(ev) => ev.stopPropagation()} className="instructions-area" onChange={(({ target }) => onChangeRecipeData('instructions', target.value))} value={recipe.instructions} name="instructions" id="" cols="30" rows="30"></textarea>
            </section>


            {/* {isMounted && <button onClick={()=>setIsEdited(false)} className={`edit-btn cancel-changes ${floatBtnClass}`}>Cancel</button>} */}
            {isMounted && <button onClick={onSaveRecipe} className={`edit-btn save-changes ${floatBtnClass}`}>Save Changes</button>}

        </div>
    );
}
