import { Link } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import axios from 'axios';
export default function MyCources() {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [myCourse, setmyCourse] = useState([])
    const baseURL = `https://ahmed-shaltout-platform.up.railway.app`;
    async function getAllcoursesByUser() {
        const { data } = await axios.get(`${baseURL}/join/?userId=66e60cb732aa56134827d964`);
        setmyCourse(data.data)
    }
    useEffect(() => {
        window.scroll(0, 0)
        getAllcoursesByUser()
    }, [myCourse?.length])
    return <>
        <section className="py-5 container ">
            <div className="row g-3 ">
                {myCourse.map((item, index) => <div key={index} className="col-6 col-sm-6 col-md-4">
                    <div className='border-1 border border-muted rounded-3'>
                        <Link to={`/lectures`}>
                        {item.courses.map((cour,index)=> 
                        <div>
                             <img src={cour.coursesIds?.photo?.secure_url} alt="" className='w-100' />
                           
                        </div>
                             
                        )}
                        </Link>
                        {item.courses.map((x,indx)=> 
                        <div>
                             <p className='px-4 text-muted '>{x.coursesIds?.name}</p>
                             <p className='px-4 text-muted '>{x.coursesIds?.teacher.fullName}</p>

                        </div>
                        )}
                        <div className="p-3">
                            <div className="d-flex align-items-start mt-2">
                                <i className="fa-solid fa-play ms-1 pt-1 text-danger small"></i>
                                <p className='text-muted small'>5 محاضرات</p>
                            </div>
                            <p className="bg-light fitContent p-1">الكيمياء </p>
                        </div>
                    </div>
                </div>)}
            </div>
        </section>
    </>
}