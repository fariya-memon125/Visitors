import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { Button ,Form} from 'react-bootstrap';
import Visitaa from "./visitorenter" 
import axios from "axios"
import "./qrcodess.css"

export default class qres extends Component {
  state = {
    result: null,
    ressss: null,
    adminnemail: null,
    entrytime:null,
  }
 

    
    
  componentDidMount() {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
        headers: {
          'authorization':`Bearer ${token}` 
        }
    }).then((res) => {
        this.setState({ adminnemail: res.data.email })
    })
}
    

 
timerr= ()=> {
  const alpha = (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ' (' + new Date().getHours() + ":" + new Date().getMinutes() + ")")
  this.setState({entrytime:alpha})
} 
  
 
handleScan = data => {
  if (data) {
      this.setState({ result: data })
        
    axios.post(`${process.env.REACT_APP_DOMAIN}/primary`,{data}).then((res) => {
        if (res.data[0].adminmail===this.state.adminnemail) {
          if (res.data[0].entrytime==="cancel by admin"||res.data[0].entrytime==="cancel by visitor") {
            alert("Visit Canceled!! Please Contact Authorities")
          } else {
            this.setState({ ressss: res.data })
          }
        }
    })
    }
    
setInterval(() => {
  this.timerr()
}, 1000);
  
}
  
  handleError = err => {
      console.error(err)
      
  }

  lolll = props => {
    this.props.backer()
  }

  render() {
    return (
      (this.state.ressss?
        <Visitaa dataaa={this.state.ressss} backer={() =>this.lolll()}/>:<div className="qrcodess">
          <h1 className="text-center my-5">Please Scan Your QRCODE:</h1>
          <QrReader
            className="m-auto"
      delay={300}
      onError={this.handleError}
      onScan={this.handleScan}
      style={{ width: '300px' }}
    />
    <Button
        // fullWidth
        onClick={this.props.backer}
          className="btn-danger my-5 w-50 bori"
      
              >
          Back?
      </Button></div>)
      
    )
  }
}