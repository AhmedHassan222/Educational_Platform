import axios from "axios";
import { createContext, useEffect, useState } from "react"
export let FilterContext = createContext(0)
export default function FilterContextProvide(props) {
    const [wordSearch, setWordSearch] = useState('');
    const [stage, setStage] = useState('');
    const [course, setCourse] = useState('');
    const [grade, setGrade] = useState('');
    const [filterCourses,setFilterCourses] = useState([]);
    const [error , setError] = useState('');
    const baseURL = 'https://ahmed-shaltout-platform.up.railway.app';
    async function search() {
        try {
            let queryParams = [];
            if (wordSearch) queryParams.push(`name=${wordSearch}`);
            if (stage) queryParams.push(`subCategoryId=${stage}`);
            if (course) queryParams.push(`_id=${course}`);
            if (grade) queryParams.push(`categoryId=${grade}`);
            const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
            const { data } = await axios.get(`${baseURL}/course${queryString}`);
            setFilterCourses(data.data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        search();


    }, [grade, stage, course, wordSearch])
    return <FilterContext.Provider value={{ wordSearch, setWordSearch, stage, setStage, course, setCourse, grade, setGrade ,filterCourses , error }}>
        {props.children}
    </FilterContext.Provider>
}