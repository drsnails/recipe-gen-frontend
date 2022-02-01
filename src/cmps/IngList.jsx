import { getIdxEquality } from "../services/utilService";
import { IngPreview } from "./ingPreview";

export function IngList({ ingredients, ingToScale, onChangeRecipeData, handleIngChange, handleEditable, addIngredient, removeIngredient, ingToRemoveIdx }) {
    return (
        <section className="ing-list">
            {ingredients.map((ingredient, idx) =>
                // <>
                <IngPreview
                    removeIngredient={removeIngredient}
                    handleEditable={handleEditable}
                    handleIngChange={handleIngChange}
                    key={ingredient.id}
                    ingredient={ingredient}
                    ingToScale={ingToScale}
                    onChangeRecipeData={onChangeRecipeData}
                    isRemovedClass={getIdxEquality(idx, ingToRemoveIdx)}
                />

                // </>
            )}
            <button onClick={addIngredient} className="add-btn">+</button>
        </section>
    );
}
