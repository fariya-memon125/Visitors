import React, { useState, useEffect } from 'react'
import './signup.css'
import axios from 'axios'
import RadioPic from '../utils/pic/radioPic'
import Modal from '../utils/bootstrap modal/modal'
import Select from '../utils/selectReactStrap/select'
import { useHistory, Link } from 'react-router-dom'
import { BsEye , BsEyeSlash } from 'react-icons/bs'
import Captcha from '../utils/captcha/captcha'
export default function Signup() {
    const [name, setName] = useState()
    const [company, setCompany] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [captcha, setCatcha] = useState()
    const [count, setCount] = useState()
    const [typed, setTyped] = useState(false)
    const [message, setMessage] = useState()
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState({ after: null, status: null, title: null, body: null, btn1: null, btn2: null })
    const history = useHistory()
    const [showPass , setShowPass] = useState(false)
    const [showPass2 , setShowPass2] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) return setMessage("name required")
        if (!company) return setMessage("company required")
        if (!email) return setMessage("email required")
        if (!password) return setMessage("password required")
        if (count.password < 3) return setMessage("password is weak")
        if (password !== confirmPassword) return setMessage("password not matching")
        if (!captcha) return setMessage("captcha invalid")
        setLoader(true)
        const data = { name, email, company, password, captcha }
        axios.post(`${process.env.REACT_APP_DOMAIN}/signin`, data).then((res) => {
            window.grecaptcha.reset()
            setMessage()
            setLoader(false)
            const msg = res.data.success
            if (!msg) return setMessage(res.data.msg)
            console.log(res.data)
            document.getElementById('signup-form').reset()
            setTyped(false)
            setCount()
            setModal({
                ...modal,
                status: true,
                title: <span className='font-weight-bold text-white ' >Success</span>,
                body: "Confirmation Email has been dispatched! Kindly Check your Email..  ",
                btn1: "Ok",
                after: () => history.push('/')
            })
        }).catch(err => {
            window.grecaptcha.reset()
            setMessage('Connection Failed')
            console.log(err)
            setLoader(false)
        })
    }
    const strength = (e) => {
        var typedObj = new Object;
        var countObj = new Object;
        const name = (e.target.name)
        const value = (e.target.value)

        if (e.target.value.length > 0) {
            typedObj[name] = true; setTyped({ ...typed, ...typedObj })
        } else typedObj[name] = false; setTyped({ ...typed, ...typedObj })

        var counter = 0;
        counter += /[@$!%*?&]/.test(value) ? 1 : 0;
        counter += /[a-z]/.test(value) ? 1 : 0;
        counter += /[A-Z]/.test(value) ? 1 : 0;
        counter += /\d/.test(value) ? 1 : 0;
        counter += /^.{8,125}$/.test(value) ? 2 : 0;

        if (name === 'password') setPassword(e.target.value.trim())
        countObj[name] = counter;
        setCount({ ...count, ...countObj })
    }
    const onId = (count) => {
        setCatcha(count)
    }
    const onModal = (count) => {
        setModal({ ...modal, status: count })
    }
    const weak = <strong className="text-danger" > weak Password</strong>
    const strong = <strong className="text-success" > Strong</strong>
    const title2 = <span className=" text-white"  > Password Strength: </span>

    return (
        <div className="" >
            <div className="sign"> </div>
            <div className="mx-auto  signUp-div ">
                <h1 className="text-white mx-5 display-1 text-center pt-5" >The Visitor</h1>
                {message ? <div class="alert alert-danger mx-5"><strong>Alert!</strong> {message}</div> : null}
                <form onSubmit={handleSubmit} id="signup-form" className="form-group my-0 mx-5" >
                    <input name="name" onChange={e => setName(e.target.value)} className="form-control my-4" placeholder="Enter your name" />
                    <input name="company" value={company} onChange={e=>setCompany(e.target.value)}  className="form-control  my-4" placeholder="Enter your company..." />
                    <input type="email" onChange={(e) => setEmail(e.target.value.trim())} value={email} className="form-control my-4" placeholder="Enter your email" />

                    <div className=" input-group rounded" style={{backgroundColor:"#efefef"}} >
                        <input name="password" type={showPass ? "text" : "password" } onChange={strength} value={password} className="form-control  "placeholder="Enter your password" />
                        <span className="input-group-append " onClick={()=>setShowPass(!showPass)} > {showPass? <BsEye className="pt-1  mx-2" style={{fontSize:"35px" }} /> 
                        : <BsEyeSlash className="pt-1  mx-2" style={{fontSize:"35px"  }} /> }</span>
                    </div>


                    {typed.password ? title2 : null}{typed.password ? (count.password > 4) ? strong : weak : null}

                    <div className=" input-group my-4 rounded " style={{backgroundColor:"#efefef"}} >
                        <input type={showPass2 ? "text" : "password" } onChange={e => setConfirmPassword(e.target.value)} className="form-control " placeholder="Password Confirm" />
                        <span className="input-group-append " onClick={()=>setShowPass2(!showPass2)} > {showPass2? <BsEye className="pt-1  mx-2" style={{fontSize:"35px" }} /> 
                        : <BsEyeSlash className="pt-1  mx-2" style={{fontSize:"35px"  }} /> }</span>
                    </div>


                    <div className="form-group d-flex justify-content-center"><Captcha onId={onId} /></div>
                    <button type="submit" disabled={loader} className="btn-lg btn-block btn-primary d-block " id="signup-btn"  >
                        {loader ? <div className="spinner-border text-white"></div> : "Sign-Up"}</button>
                </form>
                <Modal after={modal.after} onModal={onModal} status={modal.status} title={modal.title} body={modal.body} btn1={modal.btn1} btn2={modal.btn2} />
                <div className="signup-btn px-5 my-4 " >
                    <Link to="/" className="mb-4 bellow float-right" >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
