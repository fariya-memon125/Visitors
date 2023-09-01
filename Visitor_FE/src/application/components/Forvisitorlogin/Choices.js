import React, { useState }from 'react';
import Visitorformer from "./visitorenter";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import QRCODESS from "./QRCODES"
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
import Searchess from "./searchable"
import Checkouut from "./checkingoutqr"
import {BrowserRouter as Router, Switch, Route,  useRouteMatch, useParams, useHistory} from "react-router-dom";
import "../../../App.css"

function Copyright() {
  const history = useHistory()

    
    function logoutcaller(params) {
      history.push("/")
        localStorage.clear("token")
    }
    
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://accountantdomain.com/asasatech/">
        Visitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}

      <span className="mx-2" onClick={()=>logoutcaller()}>Logout?</span>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
      backgroundColor: "blue",
      fontWeight: "bold",
      padding:"10px",
  },
  submit1: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "orange",
      fontWeight: "bold",
      padding:"10px",
  },
}));

export default function Choices() {

    const [choosed,setChoosed] = useState()
    
  
  
  function backk() {
        setChoosed(null)
    }

  const classes = useStyles();


    return (
      
          (choosed === "chkout"?<Checkouut  backer={()=>backk()}/>:choosed === "visitorform" ? <Visitorformer backer={()=>backk()}/> :choosed==="checkingout"?<Searchess backer={()=>backk()}/>:choosed==="qrcode"?<QRCODESS  backer={()=>backk()}/>:
      <div className="lollipop">
        <Container style={{ paddingTop: "20vh" }} component="main" maxWidth="xs">
      <CssBaseline />
                <h1 className="text-center" style={{color:"darkgray"}}>Please Select One</h1>
                <hr></hr>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            
              color="primary"
                onClick={()=>setChoosed("visitorform")}      
            className={classes.submit}
          >
              Make an Appointment
          </Button>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
              color="primary"
              onClick={()=>setChoosed("checkingout")}
            className={classes.submit1}
          >
            CHECK OUT?
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
              color="primary"
              onClick={()=>setChoosed("qrcode")}
            className={classes.submit}
          >
            CHECK IN WITH QRCODE
          </Button>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
              color="primary"
              onClick={()=>setChoosed("chkout")}
            className={classes.submit1}
          >
            CHECK OUT WITH QR?
          </Button>
          <Box mt={8}>
  
              <Copyright />
          </Box>
    </Container>
    </div> ) );
}