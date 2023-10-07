import { useForm } from "react-hook-form"
import '../../Css/authentication/Style.auth.css'
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useLoginUserMutation } from "./authEndpoints"
import { useDispatch } from "react-redux"
import { setData } from "../../feature/authSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [loginUser,{
      isError,
      isLoading,
      isSuccess,
      error : login_user_error
  }] = useLoginUserMutation()

  
  let ldngmsg
  let errgmsg1
  let errgmsg2
  let sccsmsg

  if(isLoading){
    ldngmsg = <p style={{color:"white"}}>Loading...</p>
  }

  if(login_user_error?.data){
    errgmsg1 = <p style={{color:"red"}}>{login_user_error?.data?.message}</p>
    errgmsg2 = <p style={{color:"red"}}>{login_user_error?.data?.suggest}</p>
  }

  if(isSuccess){
    sccsmsg = <p style={{color:"white"}}>Login successfull</p>
  }
  const valuesFromRef = useRef('')
  
  
  const onSubmit = data => {

    const credentials = {
      email : data.email,
      password: data.password,
    }

    loginUser(credentials)
    .then(res => {
      localStorage.setItem('refresh_token',res?.data?.refresh_token)
      dispatch(setData({ user :res?.data?.accessed_user , token :res?.data?.refresh_token}))
      if(res?.data?.refresh_token){
        navigate('/')
      }
    })

  }


  let content

  content = (
    <div className="form_holder">
      <div  className="form_header">
          <h1>Login</h1>
          <div>
            {ldngmsg}
            {errgmsg1}
            {errgmsg2}
            {sccsmsg}
          </div>
          <div className="header__link">
            <Link className="header__link_link" to='/signup'>Don't have an account? Please sign up.</Link>
            <Link className="header__link_link">Forgot password?</Link>
          </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form__group field">
          <input type="email" className="form__field"   placeholder="Enter your email"  {...register("email", { required: true })}/>
          <label htmlFor="email" className="form__label">Email</label>
        </div>
        

        <div className="form__group field">
          <input type="password" className="form__field"  placeholder="Enter your password"  {...register("password", { required: true })} />
          <label htmlFor="password" className="form__label">Password</label>
        </div>

        <input style={{marginTop:"3rem"}} className="button-62" type="submit" value="Login"/> 
      </form>
      
    </div>
  )

  return content
}

export default Login