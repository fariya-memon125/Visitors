import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import "../../../App.css"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});






class Data extends Component {
    
    
    state = {
        adminnemail:null,
        FormData: [],
        columns: [
            {
                title: 'Name', field: 'name', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small >{rowData.name}</small>
                    </div>
                }
            },
            {
                title: 'Email', field: 'email', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.email}</small>
                    </div>
                }
            },
            {
                title: 'Visited', field: 'Visited', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{this.state.numericforvisited}</small>
                    </div>
                }
            },
            {
                title: 'Appoinments', field: 'Appoinments', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{this.state.numericforappoint}</small>
                    </div>
                }
            },
            {
                title: 'Address', field: 'address', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.branchlocation}</small>
                    </div>
                }
            },
            {
                title: 'Status', field: 'status', render: (rowData) => {
                    var alpha = "Blocked"
                    if (rowData.active) {
                        alpha = "Allowed"
                    }

                    
                    return <div style={{ width: 'cover' }}>
                        <small>{alpha}</small>
                    </div>
                }
            },
            {
                title: 'Cancelation', field: 'qrcode', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <button className="btn bg-success p-2 my-1 text-light" onClick={()=>this.cancelationbyuser(rowData)} value="Activate">Activate</button>
                        <button className="btn bg-danger p-2 text-light" onClick={()=>this.cancelationbyadmin(rowData)} value="Block">Blocked</button>
                    </div>
                }
            },
            
            
            
            
            
        ],
        data: [],
        Category: "",
        open: false,
        printData: {},
        role: null,
        email: null,
        go: true,
        numericc: 0,
        numericforappoint: 0,
        numericforvisited:0,
    }



    cancelationbyuser = (rowData) => {
        var beta = true
        var alpha=rowData._id 
        var fully = {
            alpha,
            beta
        }
        axios.patch(`${process.env.REACT_APP_DOMAIN}/Branchcanel`,  {fully} ).then((res) => {
            alert("Allowed")
        })
        window.location.reload(true)
    }
    
    cancelationbyadmin = (rowData) => {
        var beta = false
        var alpha = rowData._id
        var fully = {beta,alpha}
        axios.patch(`${process.env.REACT_APP_DOMAIN}/Branchcanel`, {fully }).then((res) => {
            alert("Blocked")
        })
        window.location.reload(true)
    }
    
    
    
    

    sendEmail = (rowdata) => {
        const alpha = rowdata._id
        axios.post(`${process.env.REACT_APP_DOMAIN}/sendqr`,{alpha}).then((res) => {
            alert("Done")
        })
}

    rowDeleteHandler = (oldData) => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/AdminDelete`, { id: oldData._id }).then((response) => {
            this.getdataaa()
        }
        )
    }

    DataUpdateHandler = (oldData,newData) => {
        axios.patch(`${process.env.REACT_APP_DOMAIN}/Update`, newData).then((response) => {
        })
    }
   
    UpdateHandler(rowData) {
        this.props.editData(rowData)

    }

    getdataaa = () => {
        const emaail = this.state.adminnemail
        axios.post(`${process.env.REACT_APP_DOMAIN}/creatytable`, { emaail }).then((response) => {
            this.setState({ data: response.data })
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                if (element.entrytime === "appointment") {
                    this.setState({numericforappoint:this.state.numericforappoint+1})
                }
                if (element.exittime !== "Still-In" && element.exittime !== "cancel by admin" && element.exittime !== "cancel by visitor") {
                    this.setState({numericforvisited:this.state.numericforvisited+1})
                }
                
            }
        })

    }


  
    componentDidMount() {
        const token = localStorage.getItem('token')
        axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
            headers: {
              'authorization':`Bearer ${token}` 
            }
        }).then((res) => {
            this.setState({ adminnemail: res.data.email })
        }).then(() => {
          this.getdataaa() 
        }
          )
    }

    
    render() {
        

           

        if (this.state.Category) {
            var fielding = this.state.Category
        } else {
            fielding = "Categories"

        }
        var y = null

            y = (oldData) =>
                new Promise((resolve) => {
                    // console.log(oldData)
                    setTimeout(() => {
                        resolve();
                        this.setState((prevState) => {
                            this.rowDeleteHandler(oldData)
                            const data = [this.state.data];
                            data.splice(data.indexOf(oldData), 1);
                            return {
                                ...prevState, data
                            }
                        });
                    }, 600);
                })
        


        return (
            <div className="container-fluid " style={{position:"relative"}}>

                    <MaterialTable
                    options={{
                        exportButton: true,
                        
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF'
                        },
                        //   rowStyle: {
                        //     backgroundColor: '#EEE',
                        //   }
                    }}
                    title="Detailed Data"

                    columns={this.state.columns}
                    data={this.state.data}

                    editable={{

                        onRowUpdate:(newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData ) {
                                        this.setState((prevState) => {
                                            this.DataUpdateHandler(oldData, newData)
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                }, 600);
                            }),

                        onRowDelete: y,



                    }}

                />

               
            </div>
            
        )

    }

}




export default Data;





