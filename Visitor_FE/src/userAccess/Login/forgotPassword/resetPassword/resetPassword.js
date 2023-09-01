import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import ReCaptcha from '../../../utils/captcha/captcha'
import Modal from '../../../utils/bootstrap modal/modal'
import Loader from '../../../utils/loader/loader'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

import './resetPassword.css'
export default function ResetPassword() {
    const [password, setPassword] = useState()
    const [confirmPassword, setConformPassword] = useState()
    const { id } = useParams()
    const token = id
    const [valid, setValid] = useState(false)
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState({ after: null, status: null, title: null, body: null, btn1: null, btn2: null })
    const [captcha, setCaptcha] = useState()
    const [message, setMessage] = useState()
    const [count, setCount] = useState()
    const [typed, setTyped] = useState(false)
    const history = useHistory()
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/checkToken`, { token }).then((res) => {
            if (!res.data.success) return history.push('/')
            setValid(true)
        }).catch(err => {
            return history.push('/')
        })
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!password) return setMessage("password required")
        if (password !== confirmPassword) return setMessage("password not matching")
        if (!captcha) return setMessage('captcha failed')
        if (count < 3) return setMessage("password is weak")
        const dis = document.getElementById('resetPassword-btn')
        dis.disabled = true
        setLoader(true)
        const data = { token, password, captcha }

        axios.post(`${process.env.REACT_APP_DOMAIN}/newPassword`, data).then((res) => {
            setMessage()
            window.grecaptcha.reset();
            console.log(res.data)
            dis.disabled = false
            setLoader(false)
            const msg = res.data.success
            if (!msg) return setMessage(res.data.msg)
            document.getElementById('resetPassword-form').reset()
            setTyped(false)
            setCount()
            setModal({
                ...modal,
                status: true,
                title: <span className='text-success text-capitalize' >{`${msg}`} </span>,
                body: "you have successfully reset the password",
                btn1: "Ok",
                after: () => history.push('/')
            })
        }).catch((err) => {
            setMessage('Connection Failed')
            window.grecaptcha.reset()
            console.log(err)
            setLoader(false)
            dis.disabled = false
        })
    }
    const strength = (e) => {
        const value = (e.target.value)
        if (value.length > 0) {
            setTyped(true)
        } else setTyped(false)
        var counter = 0;
        counter += /[@$!%*?&]/.test(value) ? 1 : 0;
        counter += /[a-z]/.test(value) ? 1 : 0;
        counter += /[A-Z]/.test(value) ? 1 : 0;
        counter += /\d/.test(value) ? 1 : 0;
        counter += /^.{8,125}$/.test(value) ? 2 : 0;
        console.log(value, counter, typed)
        setPassword(value)
        setCount(counter)
    }
    const onModal = (count) => {
        setModal({ ...modal, status: count })
    }
    const onId = (count) => {
        setCaptcha(count)
    }
    const weak = <strong className="text-danger" > weak Password</strong>
    const strong = <strong className="text-success" > Strong</strong>
    const title = <span className=" text-white"> Password Strength: </span>
    if (!valid) return <Loader />
    return (
        <div>
            <div className="sign"> </div>
            <div className=" mx-auto py-5 resetPassword-div ">
                <h1 className="text-white mx-5 display-1 text-center ">The Visiotr</h1>
                <p className="text-white mx-5 text-center sub-title ">Please Reset Your Password..</p>
                {message ? <div class="alert alert-danger mx-5"><strong>Alert!</strong> {message}</div> : null}
                <form className="form-group mx-5" id="resetPassword-form" onSubmit={handleSubmit} >
                    <div className=" input-group my-4 rounded " style={{ backgroundColor: "#efefef" }} >
                        <input type={showPass ? "text" : "password"} name="password" onChange={strength} placeholder="Enter your Password..." className="form-control " />
                        <span className="input-group-append " onClick={() => setShowPass(!showPass)} > {showPass ? <BsEye className="pt-1  mx-2" style={{ fontSize: "35px" }} />
                            : <BsEyeSlash className="pt-1  mx-2" style={{ fontSize: "35px" }} />}</span>
                    </div>
                    {typed ? title : null}{typed ? (count > 4) ? strong : weak : null}
                    <div className=" input-group my-4 rounded " style={{ backgroundColor: "#efefef" }} >
                        <input type={showPass2 ? "text" : "password"} placeholder="Confirm your Password..." className="form-control " onChange={e => setConformPassword(e.target.value)} />
                        <span className="input-group-append " onClick={() => setShowPass2(!showPass2)} > {showPass2 ? <BsEye className="pt-1  mx-2" style={{ fontSize: "35px" }} />
                            : <BsEyeSlash className="pt-1  mx-2" style={{ fontSize: "35px" }} />}</span>
                    </div>
                    <div className="d-flex justify-content-center my-4" ><ReCaptcha onId={onId} /></div>
                    <button type="submit" className="btn-lg btn-block btn-primary d-block " id="resetPassword-btn"  >
                        {loader ? <div className="spinner-border text-white"></div> : "Login"}</button>
                </form>
                <Modal after={modal.after} onModal={onModal} status={modal.status} title={modal.title} body={modal.body} btn1={modal.btn1} btn2={modal.btn2} />
            </div>
        </div>
    )
}

