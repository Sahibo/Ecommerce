import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { filterByAsc, filterByDesc } from "../../store/reducer"
export default function FiltersSelector()
{
    let dispatch = useDispatch()
    const sortByAsc = (e) => 
    {
        e.preventDefault()
        dispatch(filterByAsc())
    }

    const sortByDesc = (e) => 
    {
        e.preventDefault()
        dispatch(filterByDesc())
    }

    return (
        <div>
            <button onClick={(e) => sortByAsc(e)}>Sort by Asc</button>
            <button onClick={(e) => sortByDesc(e)}>Sort by Desc</button>
        </div>
    )
}