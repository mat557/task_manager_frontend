import { useForm } from "react-hook-form";
import '../../Css/authentication/Style.auth.css'
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "./authEndpoints";
import { useEffect, useRef } from "react";
import { setData } from "../../feature/authSlice";
import { useDispatch } from "react-redux";



const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const inputMsg = useRef('')
  const navigate = useNavigate()
  const [createUser ,{
        isError,
        isLoading,
        isSuccess,
        error : create_user_error
  }] = useCreateUserMutation()


  

          
  let ldngmsg

  if(isLoading){
    ldngmsg = <p style={{color:"white"}}>Loading...</p>
  }

  if (isError) {
    inputMsg.current = create_user_error?.data?.message
  }else if(isSuccess) {
    inputMsg.current = "User created successfully"
  }



  const onSubmit = (data) => {

      const credentials = {
        email : data.email,
        number: data.number,
        name: data.name,
        password: data.password,
      }

    createUser(credentials)
    .then(res => {
      localStorage.setItem('refresh_token',res?.data?.refresh_token)
      dispatch(setData({ user:  credentials, token :res?.data?.access_token}))
      if(res?.data?.access_token){
        navigate('/')
      }
    })
    
  };

  let content

  content = (
    <div className="form_holder">
      <div  className="form_header">
        <h1>Signup</h1>
        <div  className="header__link">
          
      {inputMsg.current}
      {ldngmsg}

            <Link className="header__link_link" to='/login'>Already have an account? Please log in.</Link>
            <Link className="header__link_link">Forgot password?</Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form__group field">
          <input type="email" className="form__field"   placeholder="Enter your email"  {...register("email", { required: true })}/>
          <label htmlFor="email" className="form__label">Email</label>
        </div>
        
        <div className="form__group field">
          <input type="number" className="form__field"  placeholder="Enter your number"  {...register("number", { required: true })}/>
          <label htmlFor="number" className="form__label">Number</label>
        </div>

        <div className="form__group field">
          <input type="input" className="form__field"   placeholder="Enter your name" {...register("name", { required: true })}/>
          <label htmlFor="name" className="form__label">Name</label>
        </div>

        <div className="form__group field">
          <input type="password" className="form__field"  placeholder="Enter your password"  {...register("password", { required: true })} />
          <label htmlFor="password" className="form__label">Password</label>
        </div>

        <input style={{marginTop:"1rem"}} className="button-62" type="submit" value="sign up"/> 
      </form>
    </div>
  )

  return content
}

export default Signup