import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useForm } from "../hooks/useFormRegister"

export function RecipeFilter({ filterBy, onChangeFilterBy }) {

    const [_filterBy, setFilterBy, register] = useForm(filterBy, onChangeFilterBy)

    useEffectUpdate(() => {
        setFilterBy(filterBy)
    }, [filterBy])

    return (
        <form onSubmit={ev => ev.preventDefault()} className="recipe-filter nice-form">
            <section className="form__group field search">
                <input {...register('term')} className="form__field" placeholder="Search by recipe or ingredient" />
                <label htmlFor="term" className="form__label">Search by recipe or ingredient</label>
            </section>

            <section className="form__group field sort">
                <select {...register('sortBy')}>
                    <option value="">Sort by</option>
                    <option value="createdAt">Date</option>
                    <option value="name">Alphabetically</option>
                </select>
            </section>

            {/* <section className="sort-dir">

                <span>{'⬆'}</span>
            </section> */}
        </form>
    )
}
