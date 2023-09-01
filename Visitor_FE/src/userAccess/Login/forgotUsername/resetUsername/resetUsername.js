import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import ReCaptcha from '../../../utils/captcha/captcha'
import Modal from '../../../utils/bootstrap modal/modal'
import Loader from '../../../utils/loader/loader'
import './resetUsername.css'
export default function ResetUsername() {
    const [username, setUsername] = useState()
    const [confirmUsername, setConformUsername] = useState()
    const { id } = useParams()
    const token = id
    const [valid, setValid] = useState()
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState({ after: null, status: null, title: null, body: null, btn1: null, btn2: null })
    const [captcha, setCaptcha] = useState()
    const [message, setMessage] = useState()
    const [count, setCount] = useState()
    const [typed, setTyped] = useState(false)
    const history = useHistory()


    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/checkTokenUsername`, { token }).then((res) => {
            console.log(res.data)
            if (!res.data.success) return history.push('/login')
            setValid(true)
        }).catch(err => {
            return history.push('/login')
        })
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault()


        if (!username) return setMessage("password required")
        if (username !== confirmUsername) return setMessage("password not matching")
        if (!captcha) return setMessage('captcha failed')
        if (count < 3) return setMessage("password is weak")


        const dis = document.getElementById('resetUsername-btn')
        dis.disabled = true
        setLoader(true)
        const data = { token, username, captcha }

        axios.post(`${process.env.REACT_APP_DOMAIN}/newUsername`, data).then((res) => {
            setMessage()
            window.grecaptcha.reset();
            console.log(res.data)
            dis.disabled = false
            setLoader(false)
            const msg = res.data.success
            if (!msg) return setMessage(res.data.msg)
            document.getElementById('resetUsername-form').reset()
            setTyped(false)
            setCount()
            setModal({
                ...modal,
                status: true,
                title: <span className='text-success text-capitalize' >{`${msg}`} </span>,
                body: "you have successfully reset the Username",
                btn1: "Ok",
                after: () => history.push('/login')
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
        } else setTyped(false )
        var counter = 0;
        counter += /[@$!%*?&]/.test(value) ? 1 : 0;
        counter += /[a-z]/.test(value) ? 1 : 0;
        counter += /[A-Z]/.test(value) ? 1 : 0;
        counter += /\d/.test(value) ? 1 : 0;
        counter += /^.{8,125}$/.test(value) ? 2 : 0;
        console.log(value , counter , typed)
        setUsername(value)
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
    const title = <span className=" text-white"  > Password Strength: </span>

    if (valid)
        return (
            <div>
                <div className="sign"> </div>
            <div className=" mx-auto py-5 resetPassword-div ">
                <h1 className="text-white mx-5 display-1 text-center ">THE VISITOR</h1>
                {message ? <div class="alert alert-danger mx-5"><strong>Alert!</strong> {message}</div> : null}
                <form className="form-group mx-5" id="resetUsername-form" onSubmit={handleSubmit} >
                    <input name="password" onChange={strength} placeholder="Enter your Username..." className="form-control my-4"  />
                    {typed? title : null}{typed? (count> 3) ? strong : weak : null}
                    <input placeholder="Confirm your Username..." className="form-control my-4" onChange={e => setConformUsername(e.target.value)} />
                    <div className="d-flex justify-content-center my-4" ><ReCaptcha onId={onId} /></div>
                    <button type="submit" className="btn-lg btn-block btn-primary d-block " id="resetUsername-btn"  >
                        {loader ? <div className="spinner-border text-white"></div> : "Login"}</button>
                </form>
                <Modal after={modal.after} onModal={onModal} status={modal.status} title={modal.title} body={modal.body} btn1={modal.btn1} btn2={modal.btn2} />
            </div>
            </div>
        )
    if (valid === null || valid === undefined) return (
        <Loader />
    )
}

