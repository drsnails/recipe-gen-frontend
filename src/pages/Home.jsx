import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// var cloneDeep = require('lodash.clonedeep');
import cloneDeep from 'lodash.clonedeep'

import { recipeService } from '../services/recipeService';
import { userService } from '../services/userService';
import { loadRecipes } from '../store/actions/recipeActions';
import { RecipeList } from '../cmps/RecipeList';
import { RecipeFilter } from '../cmps/RecipeFilter';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { setDialogOpen } from "../store/actions/dialogMsgActions";
import { showErrorMsg } from '../services/eventBusService';


export function Home() {

    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState(null);
    const [filterBy, setFilterBy] = useState({ term: '' })
    let { loggedInUser } = useSelector(state => state.userModule)

    useEffect(() => {
        // (async () => {
        //     const userFromSession = await userService.getUserFromSession()
        //     console.log('userFromSession', userFromSession)
        // })()
        loggedInUser = loggedInUser || userService.getLoggedInUser()
        _loadRecipes()

    }, []);

    useEffectUpdate(() => {

        loggedInUser && _loadRecipes()

    }, [filterBy]);



    const _loadRecipes = async () => {
        const recipes = await dispatch(loadRecipes(loggedInUser._id, filterBy))
        setRecipes(recipes)

    }

    const saveRecipe = async (recipe) => {
        try {
            const newRecipe = await recipeService.save({ recipe })
            setRecipes([...recipes, newRecipe])
        } catch (err) {
            console.log('err:', err);
            showErrorMsg({ txt: "Couldn't add recipe" })
        }
    }


    const onAddRecipe = async () => {
        const emptyRecipe = recipeService.getEmptyRecipe()
        emptyRecipe.userId = loggedInUser._id
        saveRecipe(emptyRecipe)
    }


    const onCopyRecipe = (recipe) => {
        const copiedRecipe = cloneDeep(recipe)
        delete copiedRecipe._id
        const currRecipeName = copiedRecipe.name.replace(/ \(\d+\)$/, '')
        const recipeNum = recipes.filter(recipe => recipe.name.slice(0, currRecipeName.length) === currRecipeName).length + 1
        copiedRecipe.name = currRecipeName + ` (${recipeNum})`
        saveRecipe(copiedRecipe)
    }

    const onRemoveRecipe = (recipeId, recipeName) => {
        dispatch(setDialogOpen({ txt: 'This recipe will be permanently deleted', title: `Are you sure you want to delete "${recipeName}"?`, successCb: () => removeRecipe(recipeId) }))

    }

    const removeRecipe = async (recipeId) => {

        await recipeService.remove(recipeId)
        const newRecipes = recipes.filter(recipe => recipe._id !== recipeId)
        setRecipes(newRecipes)
    }

    const onChangeFilterBy = (filterBy) => {
        setFilterBy(filterBy)

    }
    // const onChangeFilterBy = useCallback((filterBy) => {
    //     setFilterBy(filterBy)
    //     _loadRecipes()

    // }, []);


    return (
        <div className='home'>
            {loggedInUser && <h2 className='greet'>Welcome, {loggedInUser.username}</h2>}

            {/* <label for="ice-cream-choice">Choose a flavor:</label> */}

            <RecipeFilter filterBy={filterBy} onChangeFilterBy={onChangeFilterBy} />
            <RecipeList copyRecipe={onCopyRecipe} recipes={recipes} removeRecipe={onRemoveRecipe} addRecipe={onAddRecipe} />
        </div>
    );
}
