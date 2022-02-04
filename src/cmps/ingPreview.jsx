import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { getAmountToScale, selectText, sleep } from "../services/utilService";
import { showErrorMsg } from "../services/eventBusService";


export function IngPreview({ ingredient, ingToScale, onChangeRecipeData, ingredientsLength, handleIngChange, removeIngredient, providedRef, dragHandleProp, dragProp, numOfDishes }) {


    const [className, setClassName] = useState('');




    const moreRef = (el) => {
        console.log('moreREf el:', el);

    }





    const onRemoveIngredient = async () => {

        if (ingredientsLength === 1) {
            showErrorMsg({ txt: 'Sorry, for now you need to have at least 1 ingredient' })
            return
        }

        setClassName('equal')
        await sleep(350)
        removeIngredient(ingredient.id)
    }

    const mergeRefs = (...refs) => {
        const filteredRefs = refs.filter(Boolean);
        if (!filteredRefs.length) return null;
        if (filteredRefs.length === 0) return filteredRefs[0];
        return inst => {
            for (const ref of filteredRefs) {
                if (typeof ref === 'function') {
                    ref(inst);
                } else if (ref) {
                    ref.current = inst;
                }
            }
        };
    };

    const onChangeRecipeDataWrap = () => {
        if (ingredient.units === 'units') {
            showErrorMsg({ txt: "Can't set 'Units' as a main relative quantity" })
            return
        }
        onChangeRecipeData('ingToScaleId', ingredient.id)
    }


    const handleKeyPress = (ev) => {
        console.log('ev:', ev);

        if (ev.which === 13 || ev.charCode === 13) {
            ev.target.blur()
            window.getSelection().empty()
        }

    }





    // let newClass = ''
    // if (ingredient.isNew) {
    //     console.log('isNEWWWW:');
    //     newClass = 'new-ing'
    //     delete ingredient.isNew
    // }
    // console.log('newClass:', newClass);

    const dishesAmount = useMemo(() => {
        numOfDishes ||= 1
        return (ingredient.amount * numOfDishes) % 1 === 0 ? (ingredient.amount * numOfDishes) : (ingredient.amount * numOfDishes).toFixed(2)
    }, [numOfDishes])


    const ingToScaleClass = ingredient.id === ingToScale?.id ? 'chosen' : ''
    const amountToScale = (ingToScale && ingredient.units !== 'units') ? getAmountToScale(ingredient, ingToScale) : '-'
    var unitsLength = ingredient.units.length + 3
    return (


        // <article ref={mergeRefs(providedRef, articleRef)} {...dragProp} {...dragHandleProp} className={`ing-preview ${className}`}>
        <article ref={providedRef} {...dragProp} {...dragHandleProp} className={`ing-preview ${className}`}>
            {/* <button onClick={onRemoveIngredient} className="remove-btn"></button> */}
            <span tabIndex="-1" className="remove-icon" ><FontAwesomeIcon onClick={onRemoveIngredient} icon={faTrash} /></span>


            <section className="editable" className="ing-name">
                <span tabIndex="0" onKeyPress={handleKeyPress} onFocus={selectText} title={ingredient.name} data-name="name" onBlur={(ev) => handleIngChange(ev, ingredient)} contentEditable suppressContentEditableWarning={true}>{ingredient.name}</span>
            </section>
            <section className="amount-unit">
                <span tabIndex="0" onKeyPress={handleKeyPress} onFocus={selectText} inputMode="numeric" data-name="amount" onBlur={(ev) => handleIngChange(ev, ingredient)} className="editable" contentEditable suppressContentEditableWarning={true}>{dishesAmount}</span>
                <select tabIndex="0" style={{ width: `${unitsLength}ch` }} onChange={(ev) => handleIngChange(ev, ingredient)} value={ingredient.units} name="units" id="units">
                    <option value="g">g</option>
                    <option value="Kg">Kg</option>
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="cup">Cup</option>
                    <option value="tableSpoon">Table spoon</option>
                    <option value="teaSpoon">Tea spoon</option>
                    <option value="units">Units</option>
                </select>
            </section>
            <p title={amountToScale} onClick={onChangeRecipeDataWrap} className={ingToScaleClass}>{amountToScale}</p>
        </article>
    );
}