import { getAmountToScale } from "../services/utilService";


export function IngPreview({ ingredient, ingToScale, onChangeRecipeData, handleIngChange, removeIngredient }) {
    console.log('ingToScale:', ingToScale);




    
    const ingToScaleClass = ingredient.id === ingToScale?.id ? 'chosen' : ''
    const amountToScale = ingToScale ? getAmountToScale(ingredient, ingToScale) : 0
    return (
        <article className="ing-preview">
            <button onClick={() => removeIngredient(ingredient.id)} className="remove-btn">x</button>
            <h4 title={ingredient.name} data-name="name" onBlur={(ev) => handleIngChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.name}</h4>
            <section className="amount-unit">
                <span data-name="amount" onBlur={(ev) => handleIngChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.amount}</span>
                <select onChange={(ev) => handleIngChange(ev, ingredient)} value={ingredient.units} name="units" id="units">
                    <option value="g">g</option>
                    <option value="mL">mL</option>
                    <option value="Kg">Kg</option>
                    <option value="L">L</option>
                </select>
            </section>
            <p title={amountToScale} onClick={() => onChangeRecipeData('ingToScaleId', ingredient.id)} className={ingToScaleClass}>{amountToScale}</p>
        </article>
    );
}
