
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'


export function RecipePreview({ recipe, removeRecipe, copyRecipe }) {
    const navigate = useNavigate()



    return (
        <section key={recipe._id} onClick={() => navigate(`recipe/${recipe._id}`)} className='recipe-preview'>
            <section className="title">
                <span>
                    {recipe.name}
                </span>
            </section>
            <section onClick={(ev) => ev.stopPropagation()} className='actions'>
                <button onClick={() => copyRecipe(recipe)} className='copy-recipe-icon'><FontAwesomeIcon icon={faCopy} /></button>
                <button onClick={() => removeRecipe(recipe._id, recipe.name)} className="remove-recipe-icon" ><FontAwesomeIcon icon={faTrash} /></button>
            </section>
        </section>
    )

}
