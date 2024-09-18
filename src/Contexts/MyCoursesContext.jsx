import axios from "axios";
import { createContext, useState } from "react"
export let MyCoursesContext = createContext(0)
export default function MyCoursesProvide(props) {
    const [myCourse, setmyCourse] = useState([])
    const [numberOfCourses, setNumberOfCourses] = useState(0)
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    async function getAllcoursesByUser() {
        const { data } = await axios.get(`${baseURL}/join/?userId=66e60cb732aa56134827d964`);
        setmyCourse(data.data[0].courses);
        setNumberOfCourses(myCourse.length);
    }
    return <MyCoursesContext.Provider value={{ myCourse, getAllcoursesByUser, numberOfCourses }}>
        {props.children}
    </MyCoursesContext.Provider>
}