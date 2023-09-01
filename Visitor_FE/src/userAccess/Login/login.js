import React, { useState,useEffect } from 'react'
import './login.css'
import Captcha from '../utils/captcha/captcha'
import axios from 'axios'
import { Link, useHistory , Redirect} from 'react-router-dom'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [captcha, setCaptcha] = useState()
    const [check, setCheck] = useState()
    const [message, setMessage] = useState()
    const [loader, setLoader] = useState(false)
    const history = useHistory()
    const [showPass, setShowPass] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return setMessage('username incomplete')
        if (!password) return setMessage('Password incomplete')
        if (!captcha) return setMessage('captcha invalid')
        setLoader(true)
        const data = {
            email, password, captcha , check
        }
        axios.post(`${process.env.REACT_APP_DOMAIN}/login`, data).then((res) => {
            window.grecaptcha.reset()
            setLoader(false)
            const msg = res.data.msg
            if (!res.data.success) return setMessage(msg)
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
            }
            history.push('/Dashboard')
        }).catch(err => {
            window.grecaptcha.reset()
            setMessage("Connection Failed")
            setLoader(false)
        })
    }
    const onId = (count) => {
        setCaptcha(count)
    }

    
    function logoutcaller(params) {
        return (
            localStorage.clear("token")
        )
    }
      
    


    useEffect(() => {
        logoutcaller()
    }, [])
    
    return (
        <div>
            <div className="sign"> </div>
            <div className="mx-auto pt-5 login-div">
                <h1 className="text-white mx-5 display-1 text-center font-weight-bolder font-italic"  >The Visitor</h1>
                {message ? <div class="alert alert-danger mx-5"><strong>Alert!</strong> {message}</div> : null}
                <form className="form-group my-0 pb-5 mx-5" onSubmit={handleSubmit} >
                    <input onChange={e => setEmail(e.target.value.trim())} value={email} className="form-control my-4" placeholder="Enter your Email..." />
                    <div className=" input-group my-4 rounded " style={{ backgroundColor: "#efefef" }} >
                        <input type={showPass ? "text" : "password"} onChange={e => setPassword(e.target.value.trim())} value={password} className="form-control" placeholder="Enter your Password..." />
                        <span className="input-group-append " onClick={() => setShowPass(!showPass)} > {showPass ? <BsEye className="pt-1  mx-2" style={{ fontSize: "35px" }} />
                            : <BsEyeSlash className="pt-1  mx-2" style={{ fontSize: "35px" }} />}</span>
                    </div>
                    <p  className="text-white">
                    <input type="checkbox" onChange={e=> setCheck(e.target.checked)} />
                        For Visitors Table
                    </p>
                    <div className="d-flex justify-content-center my-3 " ><Captcha onId={onId} /></div>
                    <button type="submit" disabled={loader} className="btn-lg btn-block btn-primary d-block " id="login-btn"  >
                        {loader ? <div className="spinner-border text-white"></div> : "Login"}</button>
                    <div className="loginForget  mt-2" >
                        <Link to="/forgotPassword" className="loginForgetLink   ">Forgot Password?</Link>
                    </div>
                </form>
                <div className="signup-btn px-5" >
                    <Link to="/signUp" className=" mb-4 bellow float-right" >
                        Sign-Up
                    </Link>
                </div>
            </div>
        </div>
    )
}
