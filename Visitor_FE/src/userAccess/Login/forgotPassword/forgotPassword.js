import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './forgotPassword.css'
import ReCaptcha from '../../utils/captcha/captcha'
import Modal from '../../utils/bootstrap modal/modal'
export default function Forgotemail() {
    const [email, setEmail] = useState()
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState({ after: null, status: null, title: null, body: null, btn1: null, btn2: null })
    const [captcha, setCaptcha] = useState()
    const [message, setMessage] = useState()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return setMessage('email incomplete')
        if (!captcha) return setMessage('captcha failed')
        setLoader(true)
        const data = {
            email, captcha
        }
        axios.post(`${process.env.REACT_APP_DOMAIN}/forgotPassword`, data).then((res) => {
            setLoader(false)
            const msg = res.data.msg
            window.grecaptcha.reset();
            console.log(res.data)
            if (!res.data.success) return setMessage(msg)
            if (res.data.success) return setModal({
                ...modal,
                status: true,
                title: <span className='text-white font-weight-bold text-capitalize'>{`${msg}`}</span>,
                body: msg,
                btn1: "Ok",
                after: () => history.push('/')
            })
        }).catch(err => {
            setMessage("Connection Failed")
            setLoader(false)
            window.grecaptcha.reset();
        })
    }
    const onId = (count) => {
        setCaptcha(count)
    }
    const onModal = (count) => {
        setModal({ ...modal, status: count })
    }

    return (
        <div>
            <div className="sign"> </div>
            <div className="mx-auto py-5 forgotPassword-div">
                <h1 className="text-white mx-5 display-1 text-center ">The Visitor</h1>
                {message ? <div class="alert alert-danger mx-5"><strong>Alert!</strong> {message}</div> : null}
                <form className="form-group my-0 mx-5" onSubmit={handleSubmit} >
                    <input onChange={e => setEmail(e.target.value)} className="form-control my-4" placeholder="Enter your Email..." />
                    <div className="d-flex justify-content-center my-4" ><ReCaptcha onId={onId} /></div>
                    <button type="submit" disabled={loader} className="btn-lg btn-block btn-primary d-block " id="forgotPassword-btn"  >
                        {loader ? <div className="spinner-border text-white"></div> : "Login"}</button>
                </form>
                <Modal after={modal.after} onModal={onModal} status={modal.status} title={modal.title} body={modal.body} btn1={modal.btn1} btn2={modal.btn2} />
            </div>
        </div>
    )
}
