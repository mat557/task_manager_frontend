import { Route, Routes, useNavigate } from "react-router-dom"
import './App.css'
import Login from './shared/authenticate/Login'
import Signup from './shared/authenticate/Signup'
import Home from "./shared/home/Home"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { getAccessToken, logout } from "./feature/authSlice"
import useUserdata from "./hooks/useUserdata"
import { format } from 'date-fns'


function App() {
  const { u_email , roles , is_admin , is_manager } = useUserdata()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  const refresh_token = localStorage.getItem('refresh_token')
  const logRef = useRef(null)
  
  const handleLoginNavigate = () =>{
    navigate('/login')
  }
  
  const handleVisiteHome = () =>{
    navigate('/')
  }
  
  const handleLogout = () =>{
    dispatch(logout())
  }


  let currentDate = format(new Date(), 'MMMM do yyyy, h:mm:ss a');
  let links

    if(!refresh_token){
      links = <button onClick={handleLoginNavigate} className="button-60">Login</button>
    }else{
      links = <button onClick={handleLogout} className="button-60">Signout</button>
    }


  useEffect(()=>{
    if(!token){
      dispatch(getAccessToken(refresh_token))
    }
  },[token])


  return (
    <div className='head_container'>
      <div className='first_header'>
        <div className='first_header-item'>
          <h1 onClick={handleVisiteHome} >Welcome</h1>
          {links}
        </div>
        <hr/>
      </div>

      <div className='content_holder'>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="signup" element={<Signup></Signup>}></Route>
        </Routes>
      </div>

      <div className='last_header'>
        <h1>Task Pulse</h1>
        <hr className='br'/>
        <div className='last_header_stat'>
          <p className="p1">user: {u_email}</p>
          <p className="p2">status: {roles.length === 0 ? 'not set yet' : `${is_admin} , ${is_manager}`}</p>
          <p className="p2">date: {currentDate}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
