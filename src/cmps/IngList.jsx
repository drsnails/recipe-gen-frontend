import { IngPreview } from "./ingPreview";

export function IngList({ ingredients, ingToScale, onChangeIngToScale, handleChange, handleEditable, addIngredient }) {
    console.log('IngList -> ingredients', ingredients)
    return (
        <section className="ing-list">
            {ingredients.map(ingredient =>
                // <>
                    <IngPreview handleEditable={handleEditable} handleChange={handleChange} key={ingredient.id} ingredient={ingredient} ingToScale={ingToScale} onChangeIngToScale={onChangeIngToScale} />
                    
                // </>
            )}
            <button onClick={addIngredient} className="add-btn">+</button>
        </section>
    );
}
