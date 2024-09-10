import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { Route, Navigate } from "react-router-dom";
export default function ProtectedRoute({ component: Component, roles, ...rest }) {
    const userRole = getUserRole();
    return (
        <Route
            {...rest}
            render={props => {
                if (!userRole) {
                    return <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
                }
                if (roles && !roles.includes(userRole)) {
                    return <Navigate to={{ pathname: '/' }} />
                }
                return <Component {...props} />
            }}
        />
    )
}

function getUserRole() {
    const user = Cookies.get('token');
    if (user)
        return jwtDecode(user)?.role || null
    return null;
}