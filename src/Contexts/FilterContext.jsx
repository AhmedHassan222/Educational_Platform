import { createContext, useState } from "react"
export let FilterContext = createContext(0)
export default function MyCoursesProvide(props) {
    const [wordSearch, setWordSearch] = useState('');
    const [stage, setStage] = useState('');
    const [course, setCourse] = useState('');
    
    return <FilterContext.Provider value={{ }}>
        {props.children}
    </FilterContext.Provider>
}