import React, { useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://accountantdomain.com/asasatech/">
        The Visitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30%',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn(props) {

  const [namee,setNamee] = useState([])
  const [aemaill,setAemaill] = useState()
  const [respupt,setResupt] = useState()
  const [adminmail, setAdminmail] = useState()
  const [exittime, setExittime] = useState()
  const [comments,setComments] = useState()
  const [idd,setIdd] = useState()

  useEffect(() => {
    var valueapi= null
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
      headers: {
          'authorization':`Bearer ${token}` 
        }
    }).then((res) => {
      valueapi = res.data.email
      setAdminmail(res.data.email)
    })
    
  }, [])
  
  const classes = useStyles();




var  alpha = []

  var naaaam

  function searchingname(e) {
    var name = e.target.value
    var fulldata = { name, adminmail} 
    axios.post(`${process.env.REACT_APP_DOMAIN}/Finderr`, fulldata).then((res) => {
      
      if (res.data.length !==null) {
        for (let index = 0; index < res.data.length; index++) {
           naaaam = (res.data) 
           alpha.push(naaaam)
          }
          setNamee(alpha)
        
      } else {
        setNamee("No Result Found")
      }
      
      
    })
  }
  
  
  function searchingnumber(e) {
    var name = e.target.value
    var fulldata = { name, adminmail} 
    axios.post(`${process.env.REACT_APP_DOMAIN}/Finderr`, fulldata).then((res) => {
      
      if (res.data.length !==null) {
        for (let index = 0; index < res.data.length; index++) {
           naaaam = (res.data) 
           alpha.push(naaaam)
          }
          setNamee(alpha)
        
      } else {
        setNamee("No Result Found")
      }
      
      
    })
  }

  function timerr(params) {
    const alpha = (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + ' (' + new Date().getHours() + ":" + new Date().getMinutes() + ")")
    setExittime(alpha)
  }

  setInterval(() => {
    timerr()
  }, 1000);

 function Submitingupdate(e) {
   e.preventDefault()
   var id = idd
   var extt = exittime
   var comm = comments
   var updater = {id,extt,comm}
   axios.put(`${process.env.REACT_APP_DOMAIN}/updatedids`, updater).then((res) => {
      alert("Thank You for Visiting")
    }).then(
      () => {
        props.backer()
     }
   )
   
 }

function sender(id) {
  setIdd(id)
  axios.post(`${process.env.REACT_APP_DOMAIN}/Sender`, {id}).then((res) => {
    setResupt(res.data)
  }).then(
    () => {
      setAemaill(true)
}
  )
}
  var datashowedd = (aemaill ? <div className="my-4">
    <h1 className="text-center">Details</h1>
   <form className={classes.root} noValidate autoComplete="off">
    <TextField disabled value={respupt.name} id="standard-basic" label="Name" />
    <TextField disabled value={respupt.email} id="standard-basic" label="Email" />
    <TextField disabled value={respupt.number} id="standard-basic" label="Number" />
    <TextField disabled value={respupt.entrytime} id="standard-basic" label="Entry Time" />
    <TextField disabled value={exittime} id="standard-basic" label="Exit Time" />
    </form>
      <TextField
      onChange={(e)=>setComments(e.target.value) }
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
  fullWidth
  variant="contained"
            color="primary"
            onClick={(e)=>Submitingupdate(e)}
  className={classes.submit}
>
  Submit
</Button></div>:"Thank you for your visit")
  

  var beta = (namee.length !==0?namee.map((p,i)=>{return(<tr onClick={()=>sender(p[i]._id)}>
    <td>{p[i].name}</td>    
    <td>{p[i].email}</td>
    <td>{p[i].number}</td>
  </tr>)
  }) : <tr>
      <td>Thank You</td>
      <td> For Your</td>
      <td>Visit</td>
  </tr>)



  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
    Checking Out
        </Typography>
        <form className={classes.form} noValidate>
        <form className={classes.root} noValidate autoComplete="off">
  <TextField onChange={(e)=>searchingname(e)} id="standard-basic" label="Name" />
  <TextField onChange={(e)=>searchingnumber(e)} id="standard-basic" label="Phone Number" />
</form> 
          <div className="mx-auto" style={{ height: "20vh", width: "100%",overflow:"scroll" }}>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Number</th>
    </tr>
  </thead>
  <tbody>
    {beta}
  </tbody>
            </table>
            
          </div>
          {datashowedd}
          <Button
            type="submit"
            fullWidth
            variant="contained"
                      color="primary"
                      onClick={props.backer}
            className={classes.submit}
          >
            Back
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}