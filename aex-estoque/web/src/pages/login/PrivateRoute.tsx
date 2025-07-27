import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { JSX } from "react"

export function PrivateRoute({ children }: { children: JSX.Element }){
    const { isAuthenticated } = useAuth()

    if(!isAuthenticated){
        return(
            <Navigate 
                to="/login"
                replace
            />
        )
    }
    return(
        children
    )
}