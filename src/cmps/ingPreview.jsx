import { getAmountToScale } from "../services/utilService";


export function IngPreview({ ingredient, ingToScale, onChangeIngToScale, handleChange }) {



    const ingToScaleClass = ingredient.id === ingToScale.id ? 'chosen' : ''
    return (
        <article className="ing-preview">
            <h4 data-name="name" onBlur={(ev) => handleChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.name}</h4>
            <section className="amount-unit">
                <span data-name="amount" onBlur={(ev) => handleChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.amount}</span>
                <select onChange={(ev) => handleChange(ev, ingredient)} value={ingredient.units} name="units" id="units">
                    <option value="g">g</option>
                    <option value="mL">mL</option>
                    <option value="Kg">Kg</option>
                    <option value="L">L</option>
                </select>
            </section>
            <p onClick={() => onChangeIngToScale(ingredient.id)} className={ingToScaleClass}>{getAmountToScale(ingredient, ingToScale)}</p>
        </article>
    );
}
