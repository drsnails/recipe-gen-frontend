import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { getAmountToScale, selectText, sleep } from "../services/utilService";
import { showErrorMsg } from "../services/eventBusService";


export function IngPreview({
    ingredient,
    ingToScale,
    isFixedRatio,
    onChangeRecipeData,
    ingredientsLength,
    handleIngChange,
    removeIngredient,
    providedRef,
    dragHandleProp,
    dragProp,
    numOfDishes,
    handleRecipeAmounts,
    amountToScaleFixed
}) {

    const [className, setClassName] = useState('');

    const moreRef = (el) => {
        console.log('moreREf el:', el);

    }


    const onRemoveIngredient = async () => {
        if (isFixedRatio) return
        if (ingredientsLength === 1) {
            showErrorMsg({ txt: 'Sorry, for now you need to have at least 1 ingredient' })
            return
        }

        setClassName('equal')
        await sleep(350)
        removeIngredient(ingredient.id)
    }

    // const mergeRefs = (...refs) => {
    //     const filteredRefs = refs.filter(Boolean);
    //     if (!filteredRefs.length) return null;
    //     if (filteredRefs.length === 0) return filteredRefs[0];
    //     return inst => {
    //         for (const ref of filteredRefs) {
    //             if (typeof ref === 'function') {
    //                 ref(inst);
    //             } else if (ref) {
    //                 ref.current = inst;
    //             }
    //         }
    //     };
    // };


    const onHandleIngChange = (type) => {

        if (!isFixedRatio) return (ev) => handleIngChange(ev, ingredient)
        if (type === 'amount') {
            return (ev) => handleRecipeAmounts(ev, ingredient)
        }

        return () => { }
    }

    const onChangeRecipeDataWrap = () => {
        if (ingredient.units === 'units') {
            showErrorMsg({ txt: "Can't set 'Units' as a main relative quantity" })
            return
        }
        onChangeRecipeData('ingToScaleId', ingredient.id)
    }


    const handleKeyPress = (ev) => {

        // if (ev.which === 13 || ev.charCode === 13 || ev.code==='Enter' || ev.nativeEvent.keyCode===13) {
        if (ev.nativeEvent?.keyCode === 13 || ev.keyCode === 13 || ev.which === 13 || ev.charCode === 13 || ev.code === 'Enter') {
            // if (ev.keyCode === 13) {
            ev.target.blur()
            window.getSelection().empty()
            ev.stopPropagation()
        }

    }



    const dishesAmount = useMemo(() => {
        numOfDishes ||= 1
        if (!isFixedRatio) return (ingredient.amount * numOfDishes) % 1 === 0 ? (ingredient.amount * numOfDishes) : (ingredient.amount * numOfDishes).toFixed(2)
        const res = amountToScaleFixed / ingToScale.amount * ingredient.amount
        return res % 1 === 0 ? res : res.toFixed(2)
    }, [numOfDishes, amountToScaleFixed])


    const ingToScaleClass = ingredient.id === ingToScale?.id ? 'chosen' : ''
    /*TEST START*/
    let amountToScale = (ingToScale) ? getAmountToScale(ingredient, ingToScale) : ''

    /*TEST END*/

    /*ORIGINAL START*/
    // const amountToScale = (ingToScale && ingredient.units !== 'units') ? getAmountToScale(ingredient, ingToScale) : '-'
    /*ORIGINAL END*/
    var unitsLength = ingredient.units.length + 3

    const isAmountEditable = !isFixedRatio || ingredient.id === ingToScale.id
    const notAllowedClass = isFixedRatio ? 'not-allowed' : ''

    return (


        <article ref={providedRef} {...dragProp} {...dragHandleProp} className={`ing-preview ${className}`}>
            <span tabIndex="-1" className={`remove-icon ${notAllowedClass}`} ><FontAwesomeIcon onClick={onRemoveIngredient} icon={faTrash} /></span>


            <section className="editable ing-name" >
                <span tabIndex="0" className={notAllowedClass} onKeyPress={handleKeyPress} onFocus={selectText} title={ingredient.name} data-name="name" onBlur={onHandleIngChange()} contentEditable={!isFixedRatio} suppressContentEditableWarning={true}>{ingredient.name}</span>
            </section>
            <section className="amount-unit">
                <span tabIndex="0" onKeyPress={handleKeyPress} onFocus={selectText} inputMode="numeric" data-name="amount" onBlur={onHandleIngChange('amount')} className={`editable ${!isAmountEditable && 'not-allowed'}`} contentEditable={isAmountEditable} suppressContentEditableWarning={true}>{dishesAmount}</span>
                <select disabled={isFixedRatio} className={notAllowedClass} tabIndex="0" style={{ width: `${unitsLength}ch` }} onChange={onHandleIngChange()} value={ingredient.units} name="units" id="units">
                    <option value="g">g</option>
                    <option value="Kg">Kg</option>
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="oz">oz</option>
                    <option value="cup">Cup</option>
                    <option value="tableSpoon">Table spoon</option>
                    <option value="teaSpoon">Tea spoon</option>
                    <option value="units">Units</option>
                </select>
            </section>
            <p title={amountToScale} onClick={onChangeRecipeDataWrap} className={`${ingToScaleClass} ${notAllowedClass}`}>{amountToScale || '-'}</p>
        </article>
    );
}