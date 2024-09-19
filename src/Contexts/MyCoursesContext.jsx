import axios from "axios";
import { createContext, useState } from "react"
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export let MyCoursesContext = createContext(0)
export default function MyCoursesProvide(props) {
    const [myCourse, setmyCourse] = useState([])
    const [numberOfCourses, setNumberOfCourses] = useState(0)
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    const [errorFromJoin,setErrorFromJoin] = useState('');
    async function getAllcoursesByUser() {
        const { data } = await axios.get(`${baseURL}/join/?userId=66e60cb732aa56134827d964`);
        setmyCourse(data.data[0].courses);
        setNumberOfCourses(myCourse.length);
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
    return <MyCoursesContext.Provider value={{ myCourse, getAllcoursesByUser, numberOfCourses }}>
        {props.children}
    </MyCoursesContext.Provider>
}