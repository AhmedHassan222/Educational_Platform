import { createContext, useEffect, useState } from "react"

export let UserInfo = createContext(0)
function UserInfoProvide(props) {
    const [userInfo, SetUseInfo] = useState(localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null);
    useEffect(() => {
        console.log('****************')
        console.log(userInfo)
    }, [userInfo])

    return <UserInfo.Provider value={{ userInfo, SetUseInfo }}>
        {props.children}
    </UserInfo.Provider>
}
export default UserInfoProvide;