import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import Slide from '@material-ui/core/Slide';
import "../../../App.css"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});






class Data extends Component {
    
    
    state = {
        serious:false,
        adminnemail: null,
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
                title: 'Number', field: 'number', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.number}</small>
                    </div>
                }
            },
            {
                title: 'To Whom?', field: 'towhome', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.towhom}</small>
                    </div>
                }
            },
            {
                title: 'Entry Time', field: 'entrytime', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.entrytime}</small>
                    </div>
                }
            },
            {
                title: 'Exit Time', field: 'exittime', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.exittime}</small>
                    </div>
                }
            },
            {
                title: 'Address', field: 'address', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.address}</small>
                    </div>
                }
            },
            {
                title: 'Comments', field: 'comments', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.comments}</small>
                    </div>
                }
            },
            {
                title: 'Reason To Visit', field: 'reason', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.reason}</small>
                    </div>
                }
            },
            {
                title: 'Status', field: 'status', render: (rowData) => {
                    var alpha = "Visited"
                    
                    if (rowData.entrytime!=="appointment" && rowData.exittime==="Still-In") {
                        alpha="In The House"
                    } else if(rowData.entrytime==="cancelbyvisitor"){
                        alpha="Cancel By Visitor"
                    }else if(rowData.entrytime==="cancelbyadmin"){
                        alpha="Cancel By Interviewer"
                    } else if (rowData.entrytime === "appointment") {
                        alpha="Appointment"
                    }else if (rowData.entrytime === "cancel by admin") {
                        alpha="cancel by admin"
                    }else if (rowData.entrytime === "cancel by visitor") {
                        alpha="cancel by visitor"
                    }
                    
                    return <div style={{ width: 'cover' }}>
                        <small>{alpha}</small>
                    </div>
                }
            },
            {
                title: 'Cancelation', field: 'qrcode', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <button className="btn PX-2 bg-info my-1 text-light" onClick={()=>this.cancelationbyuser(rowData)} value="cancelbyvisitor">Visitor</button>
                        <button className="btn PX-2 bg-warning text-light" onClick={()=>this.cancelationbyadmin(rowData)} value="cancelbyadmin">Admin</button>
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
        var beta = "cancelled by visitor"
        var alpha=rowData._id 
        var fully = {
            alpha,
            beta
        }
        axios.patch(`${process.env.REACT_APP_DOMAIN}/cancelation`,  {fully} ).then((res) => {
            alert("Cancelled")
        })
        window.location.reload(true)
    }
    
    cancelationbyadmin = (rowData) => {
        var beta = "cancelled by admin"
        var alpha = rowData._id
        var fully = {beta,alpha}
        axios.patch(`${process.env.REACT_APP_DOMAIN}/cancelation`, {fully }).then((res) => {
            alert("Cancelled")
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
        axios.post(`${process.env.REACT_APP_DOMAIN}/table`, { emaail }).then((response) => {
            this.setState({ data: response.data })
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                if (element.exittime=="Still-In") {
                this.setState({numericc:this.state.numericc+1})                    
                }
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
            <div className="lollipop">
                    <div className="w-100  mx-auto text-center row pt-2" style={{position:"relative"}}>
                        <div className="col-md-4 col-sm-12  text-dark" style={{ minHeight: "14vh",maxHeight:"fit-content" }}><h1 style={{ border:"3px dotted black" , color:"black"}}>There are {this.state.numericc } Person Inside</h1></div>
                        <div className="col-md-4 col-sm-12  text-dark" style={{ minHeight: "14vh",maxHeight:"fit-content" }}><h1 style={{ border:"3px dotted black" , color:"black"}}>There are {this.state.numericforvisited } Person Visited</h1></div>
                        <div className="col-md-4 col-sm-12  text-dark" style={{ minHeight: "14vh",maxHeight:"fit-content" }}><h1 style={{ border:"3px dotted black" , color:"black"}}>There are {this.state.numericforappoint }  Appointments</h1></div>
                    </div>
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
                    actions={[
                        {
                            icon: "email",
                            tooltip: "Send QRCODE",
                            onClick: (event,rowData) => this.sendEmail(rowData) 
                        } 
                        
                      
                    ]}

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
            
            </div>
        )

    }

}




export default Data;





















































































































































































