import React , { useState  , useEffect} from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { Button ,Form} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function VisitorForms(props) {
  
  
  
  
  const [name,setName] = useState() 
  const [address,setAdress] = useState() 
  const [number,setNumber] = useState() 
  const [email,setEmail] = useState() 
  const [entrytime, setEntrytime] = useState(new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ' (' + new Date().getHours() + ":" + new Date().getMinutes() + ")")
  const [exittime,setExittime] = useState("Still-In")
  const [comments, setComments] = useState("No Comments") 
  const [reason, setReason] = useState() 
  const [adminmail, setAdminmail] = useState()
  const [companyname, setComapanyName] = useState()
  const [towhom,setToWhom] = useState("Null")
  const [imagee, setImagee] = useState()
  const [seller, setSeller] = useState()
  const [appoint,setAppoint]= useState(false)


  function timerr(params) {
      var alpha = "appointment"
    if (!appoint) {
       alpha = (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ' (' + new Date().getHours() + ":" + new Date().getMinutes() + ")")
        setEntrytime(alpha)
    } else {
      setEntrytime(alpha)
      
    }
  }
  setInterval(() => {
    timerr()
  }, 30000);
      

    useEffect(() => {
  

      var valueapi = null
      var hello = props.dataaa
      const token = localStorage.getItem('token')
      axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
        headers: {
          'authorization':`Bearer ${token}` 
        }
      }).then((res) => {
        valueapi = res.data.email 
        setAdminmail(res.data.email)
      }).then(
        () => {
          if (hello) {
          if (hello[0].adminmail===valueapi) {
            setName(hello[0].name)
            setSeller(hello[0]._id)
            setAdress(hello[0].address)
            setNumber(hello[0].number)
            setToWhom(hello[0].towhom)
            setReason(hello[0].reason)
            setEmail(hello[0].email)
            setAppoint(null)
          }else(alert("Wrong Fromate"))
          }
          var emaily = valueapi
          axios.post(`${process.env.REACT_APP_DOMAIN}/dataed`,  {emaily} ).then((response) => {
            setImagee(response.data.imgSrc)
            setComapanyName(response.data.company)
          })
          }
        )
  }, [])

  




  
  function Submitunction() {
    
    var Fulldata = {
      name, address, number,towhom, email, entrytime,exittime, comments,adminmail,reason
    }  

    if (seller) {
      var ide = seller
      var idss = {
       ide, name, address, number, towhom, email, entrytime, exittime, comments, adminmail, reason
      }
      axios.patch(`${process.env.REACT_APP_DOMAIN}/selll`,idss).then(((res) => {
        getchssasa()}))
    } else {
      
      axios.post(`${process.env.REACT_APP_DOMAIN}/visitorform`, Fulldata).then(((res) => {
        const alpha = res.data._id
        axios.post(`${process.env.REACT_APP_DOMAIN}/sendqr`,{alpha}).then((res) => {
          getchssasa()
        })
      
      }))  
    }
    

  
  }  
  
function getchssasa() {
  alert("Thank You For your time")
  props.backer()
}
  
  return (
    <div  className="container p-3  " >
      <Grid lg={12}>
          <Paper elevation={3} className="p-5">
          <React.Fragment >
    <Typography className="text-center " variant="h6" gutterBottom>
              <div className="d-flex justify-content-center">
                
              <h3 className="px-5  text-uppercase" style={{color:"gray",fontWeight:"bold",fontSize:"50px"}}>
      {companyname}
    <span> {imagee? <img width="100" style={{borderRadius:"100px"}} height="100" src={process.env.REACT_APP_DOMAIN+"/"+imagee} /> : null }  </span>
            <hr></hr>
              </h3>
      </div>
          
            </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <h5> Full Name:</h5>
                <TextField
          required
                  id="Name"
                  value={name}
                name="Name"
                onChange={(e)=>setName(e.target.value)}
          // label="Full name"
          fullWidth
          autoComplete={name}
          />
      </Grid>
      <Grid item xs={12} sm={6}>
        <h5>Contact Number:</h5>
                <TextField
          required
                  id="Number"
                  value={number}
          name="Number"
                onChange={(e)=>setNumber(e.target.value)}
          fullWidth
          autoComplete="family-name"
          />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <h5>Email:</h5>
                <TextField
          required
          id="Email"
                  name="Email"
                  value={email}
                onChange={(e)=>setEmail(e.target.value)}
          fullWidth
          autoComplete="email"
          />
      </Grid>
              <Grid item xs={12} sm={6}>
                <h5>To Whom?</h5>
        <TextField id="state" onChange={(e)=>setToWhom(e.target.value)} value={towhom} name="state" fullWidth />
      </Grid>
              <Grid item xs={12} sm={6}>
        <TextField
          id="EntryTime"
                name="Entry Time"
                value={entrytime}
          label="Entry Time"
                fullWidth
                disabled
          autoComplete="Entry Time"
          />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
                disabled
          id="ExitTime"
          name="Exit Time"
          label="Exit Time"
                fullWidth
                value={exittime}
          autoComplete=" Exit Time"
          />
      </Grid>
      <Grid item xs={12}>
<h5>Address*</h5>
                <TextField
          required
          id="address"
          name="address"
                  value={address}
                fullWidth
                onChange={(e)=>setAdress(e.target.value)}
          autoComplete="address-line1"
          />
      </Grid>
      <Grid item xs={12}>
        <h5>Reason To Visit</h5>
        <TextField
          id="reasontovisit"
          name="Reason To Visit"
                  fullWidth
                  value={reason}
                onChange={(e)=>setReason(e.target.value)}
          autoComplete="Reasons"
          />
  <br></br><br></br><div class="checkbox">
  <label><input onClick={(e)=>setAppoint(!appoint)} type="checkbox" value="appointment"/>Making Appointment</label>
</div>
              </Grid>
            <Grid item xs={12}>
        <FormControlLabel className="w-100"
          control={<Button className="mx-auto w-50" color="secondary" onClick={(e)=>Submitunction()} >Submit</Button>}
          
          /><br></br>
                <FormControlLabel
                  className="w-50"
          control={  <Button
            // fullWidth
            onClick={props.backer}
              className="btn-danger"
            // className={classes.submit}
          
                  >
              Back?
          </Button>}
          
          />

              </Grid>
      
          </Grid>
  </React.Fragment>
  </Paper>            

          </Grid>
          </div>
);   
}
