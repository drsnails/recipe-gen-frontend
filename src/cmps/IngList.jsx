import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useMemo, useState } from "react";

import { getIdxEquality } from "../services/utilService";
import { IngPreview } from "./ingPreview";
import { useRef } from 'react';
const grid = 8;

export function IngList({
    ingredients,
    ingToScale,
    onChangeRecipeData,
    handleIngChange,
    handleEditable,
    addIngredient,
    removeIngredient,
    ingToRemoveIdx,
    onReOrderIngs,
    numOfDishes,
    isFixedRatio,
    isWeightRatio,
    handleRecipeAmounts,
    amountToScaleFixed,
}) {

    const focusRef = useRef()

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer

        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "'grey'",

        ...draggableStyle
    });

    const [isDrag, setIsDrag] = useState(false);



    const getListStyle = isDraggingOver => ({
        // background: isDraggingOver ? "lightblue" : "lightgrey",
        // padding: grid,
        // width: 250
    });

    const onDragStart = () => {
        setIsDrag(true)

    }
    const onDragEnd = (res) => {
        setIsDrag(false)
        onReOrderIngs(res)
    }

    // const onDragEnd = (result) => {
    //     onReOrderIngs(result)
    // }



    return (
        <>

            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >

                            <section ref={focusRef} className='ing-list'>
                                {ingredients.map((ingredient, idx) =>
                                    // <>
                                    <Draggable key={ingredient.id} draggableId={ingredient.id} index={idx}>
                                        {(provided) => {
                                            return (
                                                <IngPreview
                                                    providedRef={provided.innerRef}
                                                    dragProp={provided.draggableProps}
                                                    dragHandleProp={provided.dragHandleProps}
                                                    removeIngredient={removeIngredient}
                                                    handleEditable={handleEditable}
                                                    handleIngChange={handleIngChange}
                                                    key={ingredient.id}
                                                    ingredient={ingredient}
                                                    ingToScale={ingToScale}
                                                    isFixedRatio={isFixedRatio}
                                                    isWeightRatio={isWeightRatio}
                                                    onChangeRecipeData={onChangeRecipeData}
                                                    numOfDishes={numOfDishes}
                                                    isRemovedClass={getIdxEquality(idx, ingToRemoveIdx)}
                                                    ingredientsLength={ingredients.length}
                                                    handleRecipeAmounts={handleRecipeAmounts}
                                                    amountToScaleFixed={amountToScaleFixed}
                                                    focusRef={focusRef}
                                                />
                                            )
                                        }}
                                    </Draggable>
                                )}
                                {(provided.placeholder)}
                                {<button className="add-btn" onClick={addIngredient} ><FontAwesomeIcon icon={faPlus} /></button>}
                                {/* {(!snapshot.isDraggingOver||true) && <button style={{top: `${snapshot.isDraggingOver?}`}} onClick={addIngredient} className="add-btn"><FontAwesomeIcon icon={faPlus} /></button>} */}

                            </section>
                        </div>

                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}
