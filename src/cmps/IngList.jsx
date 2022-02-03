import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";

import { getIdxEquality } from "../services/utilService";
import { IngPreview } from "./ingPreview";
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
    onReOrderIngs
}) {
    const [isDrag, setIsDrag] = useState(false);
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer

        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "'grey'",

        ...draggableStyle
    });


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
                            <section className="ing-list">
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
                                                    onChangeRecipeData={onChangeRecipeData}

                                                    isRemovedClass={getIdxEquality(idx, ingToRemoveIdx)}
                                                    ingredientsLength={ingredients.length}
                                                />
                                            )
                                        }}
                                    </Draggable>
                                )}
                                {/* {(!snapshot.isDraggingOver || true) && <button onClick={addIngredient} className="add-btn"><FontAwesomeIcon icon={faPlus} /></button>} */}
                                {!snapshot.isDraggingOver && <button onClick={addIngredient} className="add-btn"><FontAwesomeIcon icon={faPlus} /></button>}

                            </section>
                        </div>

                    )}
                </Droppable>
            </DragDropContext>
            {isDrag && <div className="gap"></div>}
        </>
    );
}
