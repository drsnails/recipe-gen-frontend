import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { recipeService } from '../services/recipeService';
import { userService } from '../services/userService';
import { loadRecipes } from '../store/actions/recipeActions';
import { RecipeList } from '../cmps/RecipeList';
import { RecipeFilter } from '../cmps/RecipeFilter';
import { useEffectUpdate } from '../hooks/useEffectUpdate';
import { createPortal } from "react-dom";


export function Home() {

    let { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState(null);
    const [filterBy, setFilterBy] = useState({ term: '' })

    useEffect(() => {
        (async () => {
            const userFromSession = await userService.getUserFromSession()
            console.log('userFromSession', userFromSession)
        })()
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


    const addRecipe = async () => {
        const emptyRecipe = recipeService.getEmptyRecipe()
        emptyRecipe.userId = loggedInUser._id
        const newRecipe = await recipeService.save(emptyRecipe)
        setRecipes([...recipes, newRecipe])
    }

    const removeRecipe = async (ev, recipeId) => {
        ev.stopPropagation()
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
            <RecipeList recipes={recipes} removeRecipe={removeRecipe} addRecipe={addRecipe} />
        </div>
    );
}
