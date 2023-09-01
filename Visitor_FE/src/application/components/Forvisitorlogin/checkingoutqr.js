import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Button, Form } from 'react-bootstrap';
import Searchable from "./searchable" 
import axios from "axios"
import "./qrcodess.css"


export default class qrescheck extends Component {
  state = {
    result: null,
    ressss: null,
    exittime:null,
    comments:null,
    adminnemail:null,
  }
 


  timerr= ()=> {
    const alpha = (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ' (' + new Date().getHours() + ":" + new Date().getMinutes() + ")")
    this.setState({exittime:alpha})
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
  
  handleScan = data => {
    if (data) {
        this.setState({ result: data })
        
      axios.post(`${process.env.REACT_APP_DOMAIN}/primary`,{data}).then((res) => {
          if (res.data[0].adminmail===this.state.adminnemail) {
            if (res.data[0].entrytime==="appointment") {
              alert("Please Check in First")
            }else  if (res.data[0].entrytime==="cancel by admin"||res.data[0].entrytime==="cancel by visitor") {
              alert("Visit Canceled!! Please Contact Authorities")
            } else {
              this.setState({ ressss: res.data })
            }  
          }
      })
      }
      
  setInterval(() => {
    this.timerr()
  }, 100);
    
  }
  handleError = err => {
      console.error(err)
      
  }

  lolll = props => {
    this.props.backer()
    }
    
    
  Submitingupdate=(e)=> {
    e.preventDefault()
    var id = this.state.ressss[0]._id
    var extt = this.state.exittime
    var comm = this.state.comments
    var updater = {id,extt,comm}
    axios.patch(`${process.env.REACT_APP_DOMAIN}/updatedids`, updater).then((res) => {
       alert("Thank You for Visiting")
      console.log(res)
    }).then(
       () => {
         this.props.backer()
      }
    )
    
  }





  render() {
    return (
      (this.state.ressss?


        <div className="col-sm-12 qrcodess  col-lg-12" style={{height:"90vh"}}>
          <Paper elevation={3}
          className="mx-auto col-lg-6 "
          >
          <h1 className="text-center">Details</h1>
   <form noValidate autoComplete="off">
    <TextField disabled  className="m-3" value={this.state.ressss[0].name} id="standard-basic" label="Name" />
    <TextField disabled  className="m-3" value={this.state.ressss[0].email} id="standard-basic" label="Email" />
    <TextField disabled  className="m-3" value={this.state.ressss[0].number} id="standard-basic" label="Number" />
    <TextField disabled  className="m-3" value={this.state.ressss[0].entrytime} id="standard-basic" label="Entry Time" />
    <TextField disabled  className="m-3" value={this.state.exittime} id="standard-basic" label="Exit Time" />
    </form>
      <TextField
      onChange={(e)=>this.setState({comments:e.target.value}) }
      size="Normal"    
      id="standard-full-width"
          label="FeedBack"
          style={{ margin: 8 }}
          placeholder="Feedback"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
    <Button
              type="submit"
              className="mx-auto my-3"
  fullWidth
  variant="contained"
            color="primary"
            onClick={(e)=>this.Submitingupdate(e)}
>
  Submit
</Button></Paper></div>:<div className="qrcodess">
          <h1 className="text-center ">Please Scan Your QRCODE:</h1>
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