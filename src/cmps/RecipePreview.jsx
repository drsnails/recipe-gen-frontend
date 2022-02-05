
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export function RecipePreview({ recipe, removeRecipe }) {
    const navigate = useNavigate()


    const onRemoveRecipe = (ev) => {
        ev.stopPropagation()
        removeRecipe(recipe._id, recipe.name)
    }
    return (
        <section key={recipe._id} onClick={() => navigate(`recipe/${recipe._id}`)} className='recipe-preview'>
            <span>
                {recipe.name}
            </span>
            <span onClick={onRemoveRecipe} className="remove-icon" ><FontAwesomeIcon icon={faTrash} /></span>
        </section>
    )

}
