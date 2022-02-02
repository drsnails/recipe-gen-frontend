import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { recipeService } from '../services/recipeService';
import { userService } from '../services/userService';
import { loadRecipes } from '../store/actions/recipeActions';

export function Home() {
    const navigate = useNavigate()
    let { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        (async () => {
            const userFromSession = await userService.getUserFromSession()
            console.log('userFromSession', userFromSession)
        })()
        loggedInUser = loggedInUser || userService.getLoggedInUser()
        _loadRecipes()

    }, []);


    const _loadRecipes = async () => {
        const recipes = await dispatch(loadRecipes(loggedInUser._id))
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

    return (
        <div className='home'>
            {loggedInUser && <h2>Welcome {loggedInUser.username}</h2>}
            <section className='recipe-list simple-cards-grid'>
                {recipes && recipes.map(recipe =>
                    <section key={recipe._id} onClick={() => navigate(`recipe/${recipe._id}`)} className='recipe-preview'>
                        <span>
                            {recipe.name}
                        </span>
                        <span onClick={(ev) => removeRecipe(ev, recipe._id)} className="remove-icon" ><FontAwesomeIcon icon={faTrash} /></span>
                    </section>)
                }
                <button className='nice-btn blue' onClick={addRecipe}>Add New Recipe</button>

            </section>
        </div>
    );
}
