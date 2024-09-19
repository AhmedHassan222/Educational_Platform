import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react"
export let MyCoursesContext = createContext(0)
export default function MyCoursesProvide(props) {
    const [myCourse, setmyCourse] = useState([])
    const [numberOfCourses, setNumberOfCourses] = useState(0)
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [errorFromJoin,setErrorFromJoin] = useState('');
    async function getAllcoursesByUser() {
        let user;
        if (Cookies.get('token'))
            user = jwtDecode(Cookies.get('token'))
        try {
            const { data } = await axios.get(`${baseURL}/join/?userId=${user?._id}`);
            setmyCourse(data.data[0].courses);
            setNumberOfCourses(myCourse.length);
        } catch (error) {
            setErrorFromJoin(error.message)
        }
    }
    useEffect(()=>{
        localStorage.setItem("numberOfCourses",numberOfCourses)
    },[numberOfCourses])
    return <MyCoursesContext.Provider value={{ myCourse, getAllcoursesByUser, numberOfCourses ,errorFromJoin }}>
        {props.children}
    </MyCoursesContext.Provider>
}