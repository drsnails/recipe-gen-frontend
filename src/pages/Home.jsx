import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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
        console.log('loggedInUser:', loggedInUser);
        
        const recipes = await dispatch(loadRecipes(loggedInUser._id))
        console.log('const_loadRecipes= -> recipes', recipes)
        setRecipes(recipes)
    }

    return (
        <div className='home'>
            <h2>Welcome {loggedInUser.username}</h2>
            <section className='recipe-list simple-cards-grid'>
                {recipes && recipes.map(recipe =>
                    <section onClick={() => navigate(`recipe/${recipe._id}`)} className='recipe-preview'>{recipe.name}</section>)
                }

            </section>
        </div>
    );
}
