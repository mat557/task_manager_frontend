import { useForm } from "react-hook-form";
import '../../Css/authentication/Style.auth.css'
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useLoginUserMutation } from "./authEndpoints";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loginUser,{
      isError,
      isLoading,
      isSuccess,
      error : login_user_error
  }] = useLoginUserMutation()


  let ldngmsg

  if(isLoading){
    ldngmsg = <p style={{color:"white"}}>Loading...</p>
  }

  const valuesFromRef = useRef('')
  
  
  const onSubmit = data => {
    console.log(data);
    // valuesFromRef.current = data
  }

  console.log(valuesFromRef.current)
  let content

  content = (
    <div className="form_holder">
      <div  className="form_header">
          <h1>Login</h1>
          <div className="header__link">
            {ldngmsg}
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