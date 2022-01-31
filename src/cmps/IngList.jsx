import { IngPreview } from "./ingPreview";

export function IngList({ ingredients, ingToScale, onChangeRecipeData, handleIngChange, handleEditable, addIngredient, removeIngredient }) {
    console.log('IngList -> ingredients', ingredients)
    return (
        <section className="ing-list">
            {ingredients.map(ingredient =>
                // <>
                <IngPreview
                    removeIngredient={removeIngredient}
                    handleEditable={handleEditable}
                    handleIngChange={handleIngChange}
                    key={ingredient.id}
                    ingredient={ingredient}
                    ingToScale={ingToScale}
                    onChangeRecipeData={onChangeRecipeData}
                />

                // </>
            )}
            <button onClick={addIngredient} className="add-btn">+</button>
        </section>
    );
}
