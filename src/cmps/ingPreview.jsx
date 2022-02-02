import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPepperHot, faTrash } from '@fortawesome/free-solid-svg-icons'

import { getAmountToScale, selectText, sleep } from "../services/utilService";
import { showErrorMsg } from "../services/eventBusService";


export function IngPreview({ ingredient, ingToScale, onChangeRecipeData, ingredientsLength, handleIngChange, removeIngredient, providedRef, dragHandleProp, dragProp }) {


    const [className, setClassName] = useState('');


    const ingToScaleClass = ingredient.id === ingToScale?.id ? 'chosen' : ''
    const amountToScale = ingToScale ? getAmountToScale(ingredient, ingToScale) : 0
    var unitsLength = ingredient.units.length + 3

    const onRemoveIngredient = async () => {

        if (ingredientsLength === 1) {
            showErrorMsg({ txt: 'Sorry, for now you need to have at least 1 ingredient' })
            return
        }
        
        setClassName('equal')
        await sleep(350)
        removeIngredient(ingredient.id)
    }


    // let newClass = ''
    // if (ingredient.isNew) {
    //     console.log('isNEWWWW:');
    //     newClass = 'new-ing'
    //     delete ingredient.isNew
    // }
    // console.log('newClass:', newClass);


    return (
        <article ref={providedRef} {...dragProp} {...dragHandleProp} className={`ing-preview ${className}`}>
            {/* <button onClick={onRemoveIngredient} className="remove-btn"></button> */}
            <span className="remove-icon" ><FontAwesomeIcon onClick={onRemoveIngredient} icon={faTrash} /></span>


            <section className="editable" className="ing-name">
                <span tabIndex="1" onFocus={selectText} title={ingredient.name} data-name="name" onBlur={(ev) => handleIngChange(ev, ingredient)} contentEditable suppressContentEditableWarning={true}>{ingredient.name}</span>
            </section>
            <section className="amount-unit">
                <span onFocus={selectText} inputMode="numeric" data-name="amount" onBlur={(ev) => handleIngChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{ingredient.amount}</span>
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
