import React,{useEffect} from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import Loader from '../../utils/loader/loader'

export default function Activate() {
    const { id } = useParams()
    const token = id
    const history = useHistory()
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/checkTokenAccount`, {token}).then((res) => {
            if(res.data.success) return history.push('/')
            history.push('/signup')
        }).catch(err => {
            history.push('/signup')
        })
    }, [token])
     return <Loader />
}
