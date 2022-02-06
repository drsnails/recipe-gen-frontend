
import { RecipePreview } from './RecipePreview';

export function RecipeList({ recipes, removeRecipe, addRecipe, copyRecipe }) {

    return (
        <section className='recipe-list simple-cards-grid'>

            {recipes && recipes.map(recipe =>
                <RecipePreview key={recipe._id} recipe={recipe} removeRecipe={removeRecipe} copyRecipe={copyRecipe} />
            )}


            <button className='nice-btn blue' onClick={addRecipe}>Add New Recipe</button>
        </section>
    )

}
