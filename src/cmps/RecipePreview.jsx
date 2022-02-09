
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'


export function RecipePreview({ recipe, removeRecipe, copyRecipe }) {
    const navigate = useNavigate()
    

    const placeholderImgUrl = require('../assets/imgs/pepper-logo.png')
    const noImgClass = recipe.imgUrl ? '' : 'no-img'
    return (
        <section key={recipe._id} onClick={() => navigate(`recipe/${recipe._id}`)} className='recipe-preview'>
            <section style={{ backgroundImage: `url(${recipe.imgUrl || placeholderImgUrl})` }} className={`img-container ${noImgClass}`}>
                <section className="title-container">
                    <span className='title'>
                        {recipe.name}
                    </span>
                </section>
            </section>
            {/* <section className="title">
                <span>
                    {recipe.name}
                </span>
            </section> */}
            <section onClick={(ev) => ev.stopPropagation()} className='actions'>
                <button onClick={() => copyRecipe(recipe)} className='copy-recipe-icon'><FontAwesomeIcon icon={faCopy} /></button>
                <button onClick={() => removeRecipe(recipe._id, recipe.name)} className="remove-recipe-icon" ><FontAwesomeIcon icon={faTrash} /></button>
            </section>
        </section>
    )

}
