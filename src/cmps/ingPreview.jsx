import { getAmountToScale } from "../services/utilService";


export function IngPreview({ ingredient, ingToScale, onChangeRecipeData, handleIngChange, removeIngredient, isRemovedClass, providedRef, dragHandleProp, dragProp }) {





    const ingToScaleClass = ingredient.id === ingToScale?.id ? 'chosen' : ''
    const amountToScale = ingToScale ? getAmountToScale(ingredient, ingToScale) : 0
    var unitsLength = ingredient.units.length + 3
    
    return (
        <article ref={providedRef} {...dragProp} {...dragHandleProp} className={`ing-preview ${isRemovedClass}`}>
            <button onClick={() => removeIngredient(ingredient.id)} className="remove-btn">x</button>
            <h4 title={ingredient.name} data-name="name" onBlur={(ev) => handleIngChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.name}</h4>
            <section className="amount-unit">
                <span inputMode="numeric" data-name="amount" onBlur={(ev) => handleIngChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.amount}</span>
                <select style={{ width: `${unitsLength}ch` }} onChange={(ev) => handleIngChange(ev, ingredient)} value={ingredient.units} name="units" id="units">
                    <option value="g">g</option>
                    <option value="Kg">Kg</option>
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="cup">Cup</option>
                    <option value="tableSpoon">Table spoon</option>
                    <option value="teaSpoon">Tea spoon</option>
                </select>
            </section>
            <p title={amountToScale} onClick={() => onChangeRecipeData('ingToScaleId', ingredient.id)} className={ingToScaleClass}>{amountToScale}</p>
        </article>
    );
}
