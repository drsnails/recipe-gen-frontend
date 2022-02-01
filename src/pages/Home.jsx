import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { recipeService } from '../services/recipeService';
import { loadRecipes } from '../store/actions/recipeActions';

export function Home() {
    const navigate = useNavigate()
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState(null);
    
    useEffect(() => {
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

    return (
        <div className='home'>
            {loggedInUser && <h2>Welcome {loggedInUser.username}</h2>}
            <section className='recipe-list simple-cards-grid'>
                {recipes && recipes.map(recipe =>
                    <section key={recipe._id} onClick={() => navigate(`recipe/${recipe._id}`)} className='recipe-preview'>{recipe.name}</section>)
                }
                <button onClick={addRecipe}>New Recipe</button>

            </section>
        </div>
    );
}
