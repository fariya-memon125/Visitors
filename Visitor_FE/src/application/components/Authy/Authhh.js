import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; 
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Authytable from "./authytable"
import "../../../App.css"



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        // fontWeight: theme.typography.fontWeightRegular,
        // fontWeight: "bold",
        textTransform: "capitalize",
        fontSize: "18px",
    },
}));

export default function SimpleAccordion() {
    const classes = useStyles();
    const history = useHistory()
    const [pendingEntry, setPendingEntry] = useState([])
    const [reload, setReload] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
            headers: {
                'authorization':`Bearer ${token}` 
            }
        }).then((res) => {
            if (res.data.role) {
                setReload(true)
            }else history.goBack()
        }).catch(() => {
            history.goBack()
          })
    }, [])
    useEffect(() => {
        if(!reload) return
        axios.get(`${process.env.REACT_APP_DOMAIN}/approve`).then((res) => {
            setPendingEntry(res.data)
        })
    }, [reload])

    const handleAccept = (e) => {
        console.log(e)
        axios.post(`${process.env.REACT_APP_DOMAIN}/acceptEntry`, {e}).then(res => {
            if (res.data) {
                alert("Done")
                window.location.reload(true)                
                axios.get(`${process.env.REACT_APP_DOMAIN}/approve`).then((res) => {
                    setPendingEntry(res.data)
                    
                })
            }

        }).catch(err => {
        })
    }
    const handleDelete = (e) => {
        const token = localStorage.getItem('token')
        axios.patch(`${process.env.REACT_APP_DOMAIN}/deleteEntryRequest`,{ e}, {
            headers: {
                Authorization: `bearer ${token} `
            }
        }).then(res => {
            if (res.data) {
                setReload(!reload)

                alert("done")

            }

        }).catch(err => {
            // ErrHandle(err, history)
        })
    }
if(reload){
    
    return (
        <div className={classes.root,"lollipop"}>
            <center className="mb-2">
                <h3>Recent Requests</h3>
            </center>
            
            {pendingEntry.map(entry => {
                const id = entry._id
            
                return (
                    <div className="m-5" >

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>{entry.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <table className="w-100 "  >
                                        <tr>
                                            <th>Name:</th>
                                            <td>{entry.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Email:</th>
                                            <td>{entry.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Company:</th>
                                            <td>{entry.company}</td>
                                        </tr>
                                    </table>
                                    <br></br>
                                    <div className="float-left">
                                        <button className="btn btn-success m-1 float-left" onClick={() => { handleAccept({ id }) }} >Accept</button>
                                        <button className="btn btn-danger m-1  float-left" onClick={() => { handleDelete({ id }) }} >Decline</button>
                                    </div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion> 
                    </div>
                )
            })}
            <Authytable/>
            {/* <FooterPage /> */}
        </div>
    );
    
}
if(!reload){
        return (
            <center style={{ position:"relative" , top:"50vh" , transform:"translateY(-50%)" }}>
                <div><h1 className="spinner-border text-primary "></h1></div>
            </center>
        )
}
}