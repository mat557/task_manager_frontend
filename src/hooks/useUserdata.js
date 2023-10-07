import { useSelector } from "react-redux"
import { accessToken } from "../feature/authSlice"
import jwtDecode from 'jwt-decode'

const useUserdata = () =>{
    const token = useSelector(accessToken)
    let is_admin = false
    let is_manager = false
    let u_email = ''

    if(token){
        const decoded = jwtDecode(token)
        const { email , roles } = decoded?.data

        u_email = email
        is_admin = roles.includes('admin')
        is_manager = roles.includes('manager')

        return { u_email ,  roles , is_admin , is_manager }
    }

    return { u_email :'' , roles: [] , is_admin , is_manager }
}

export default useUserdata