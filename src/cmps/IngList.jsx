import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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


    const reOrder = () => {

    }

    // const onDragEnd = (result) => {
    //     onReOrderIngs(result)
    // }



    return (
        <DragDropContext onDragEnd={onReOrderIngs}>
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
                                    {(provided) => (
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
                                        />
                                    )}
                                </Draggable>
                            )}
                            {!snapshot.isDraggingOver && <button onClick={addIngredient} className="add-btn"><FontAwesomeIcon icon={faPlus}/></button>}
                        </section>
                    </div>

                )}
            </Droppable>
        </DragDropContext>

    );
}
