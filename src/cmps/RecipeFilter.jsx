import { useForm } from "../hooks/useFormRegister"

export function RecipeFilter({ filterBy, onChangeFilterBy }) {

    const [_filterBy, setFilterBy, register] = useForm(filterBy, onChangeFilterBy)

    return (
        <form className="recipe-filter">
            <div className="form__group field">
                <input {...register('term')} className="form__field" placeholder="Search by recipe or ingredient" />
                <label htmlFor="term" className="form__label">Search by recipe or ingredient</label>
            </div>
        </form>
    )
}