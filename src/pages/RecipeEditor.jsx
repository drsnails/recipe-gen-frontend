import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";


import { InputSwitch } from "../cmps/InputSwitch";
import { Loader } from "../cmps/Loader";
import { RecipeImg } from "../cmps/RecipeImg";
import { ShareButton } from "../cmps/ShareButton";
import { useEffectUpdate } from "../hooks/useEffectUpdate";
import { useForm } from "../hooks/useFormRegister";
import { showErrorMsg, showSuccessMsg } from "../services/eventBusService";
import { recipeService } from "../services/recipeService";
import { userService } from "../services/userService";
import { copyToClipboard, reOrderList, selectText, sleep } from "../services/utilService";
import { setLoading } from "../store/actions/loaderActions";


// import { IngList } from "../cmps/IngList";
const IngList = lazy(() => import('../cmps/IngList'))

var cloneDeep = require('lodash.clonedeep');

export default function RecipeEditor() {
    const [recipe, setRecipe] = useState();
    const [ingToRemoveIdx, setIngToRemoveIdx] = useState(null);
    const [numOfDishes, setNumOfDishes] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const ingToScaleRef = useRef(null)
    const [isFixedRatio, setIsFixedRatio] = useState(false)
    const [amountToScaleFixed, setAmountToScaleFixed] = useState()
    // const [fixedRatioIngredients, setFixedRatioIngredients] = useState(second)

    const dispatch = useDispatch()


    const params = useParams()



    useEffect(() => {
        loadRecipe()
    }, [params.id]);

    // TODO continue for fixed scale
    useEffect(() => {
        if (!recipe) return
        const ingToScale = getIngredientToScale(recipe)
        setAmountToScaleFixed(ingToScale.amount)
    }, [recipe?.ingToScaleId])

    const loadRecipe = async () => {
        try {
            const recipe = params.id ? await recipeService.getById(params.id) : recipeService.getEmptyRecipe()
            setRecipe(recipe)

        } catch (err) {
            console.log('failing');
            setErrMsg("Sorry,  can't find this recipe at the moment")
        } finally {

        }
    }


    useEffectUpdate(() => {
        if (!isFixedRatio) {
            const ingToScale = getIngredientToScale(recipe)
            setAmountToScaleFixed(ingToScale.amount)
        }
    }, [isFixedRatio])

    const saveRecipe = async (data, type) => {
        const { recipe } = data
        const oldRecipe = cloneDeep(recipe)
        if (isFixedRatio) return
        try {
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






    const getIngredientToScale = useCallback((recipe) => {
        const ingToScale = recipe.ingredients.find(ing => ing.id === recipe.ingToScaleId)
        return ingToScale
    }, [recipe]);

    const onChangeRecipeData = async (field, value) => {

        const recipeToSave = { ...recipe, [field]: value }
        // if (!isEdited) setIsEdited(true)
        if (field === 'ingToScaleId' || field === 'imgUrl') {
            saveRecipe({ recipe: recipeToSave, field, value }, 'updateRecipe')
        } else {
            triggerSaveBtn(recipeToSave)
        }

    }


    const handleRecipeAmounts = ({ target }, ingredient) => {
        let amount = +target.innerText
        if (!amount) amount = ingToScale.amount
        setAmountToScaleFixed(amount)
    }

    const handleIngChange = async (ev, ingredient) => {
        const { target } = ev
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
        triggerSaveBtn(recipeToSave)
    }

    /**
     * remove ingredient
     * 
     * @param {string} ingId 
     */
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


    const onChangeRecipeImg = async (imgUrl, isRemove) => {
        if (!imgUrl && !isRemove) return
        await onChangeRecipeData('imgUrl', imgUrl)
        dispatch(setLoading(false))
    }



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
        const recipeTxt = recipeService.getRecipeTxt(recipe)
        copyToClipboard(recipeTxt)
        showSuccessMsg({ txt: 'Copied to clipboard' })
    }



    if (!recipe) return <div>{errMsg || <Loader _isLoading={true} />}</div>
    const ingToScale = getIngredientToScale(recipe)


    const floatBtnClass = isEdited ? 'animate-in' : 'animate-out'
    const recipeTxt = recipeService.getRecipeTxt(recipe)
    if (!amountToScaleFixed) return <Loader _isLoading={true} />

    return (
        <div className='recipe-editor'>

            <section className="title-container">
                <h2 onFocus={selectText} onBlur={({ target }) => onChangeRecipeData('name', target.innerText)} contentEditable suppressContentEditableWarning={true} >{recipe.name}</h2>
                <button className="btn copy" onClick={onCopyToClipBoard}>Copy To Clipboard</button>
            </section>
            <RecipeImg imgUrl={recipe.imgUrl} isEdited={isEdited} onChangeImg={onChangeRecipeImg} />
            <section className="share-btns">
                <ShareButton url=" " type="whatsapp" title={recipeTxt} />
                <ShareButton url="facebook.com" type="facebook" quote={recipeTxt} />
                <ShareButton url="telegram.com" type="telegram" title={recipeTxt} />
                <ShareButton url="" type="email" subject={recipe.name} body={recipeTxt} />
            </section>
            <section className="title-edit">
                {/* <section className="inner-edit"> */}
                {/* <strong className="ingredients">Ingredients</strong> */}
                <InputSwitch value={isFixedRatio} onChange={() => setIsFixedRatio(prevIsFixed => !prevIsFixed)} />
                {/* </section> */}
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
                isFixedRatio={isFixedRatio}
                handleRecipeAmounts={handleRecipeAmounts}
                amountToScaleFixed={amountToScaleFixed}
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
