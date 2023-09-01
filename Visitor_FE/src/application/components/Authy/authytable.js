import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import Slide from '@material-ui/core/Slide';



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
                title: 'Company Name', field: 'company', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <small>{rowData.company}</small>
                    </div>
                }
            },
            {
                title: 'Status', field: 'status', render: (rowData) => {
                    var alpha = <small className="bg-success text-light w-100 p-2" style={{fontSize:"20px"}}>Access</small>
                    
                    if (rowData.roleStatus===false) {
                        alpha=<small className="bg-danger text-light w-100 p-2" style={{fontSize:"20px"}}>Denied</small>
                    } 
                       
                    return <div style={{ width: 'cover' }}>
                        <small>{alpha}</small>
                    </div>
                }
            },
            {
                title: 'Cancelation', field: 'qrcode', render: (rowData) => {
                    return <div style={{ width: 'cover' }}>
                        <button className="btn bg-danger m-1 text-light" onClick={()=>this.blockeddd(rowData)} value="Blocked">Blocked</button>
                        <button className="btn bg-success text-light" onClick={()=>this.accessedd(rowData)} value="Access">Access</button>
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
    }



    blockeddd = (rowData) => {
        var beta = false
        var alpha=rowData._id 
        var fully = {
            alpha,
            beta
        }
        axios.patch(`${process.env.REACT_APP_DOMAIN}/blockeed`,  {fully} ).then((res) => {
            this.getdataaa()
            alert("Blocked")
        })
    }
    
    accessedd = (rowData) => {
        var beta = true
        var alpha = rowData._id
        var fully = {beta,alpha}
        axios.patch(`${process.env.REACT_APP_DOMAIN}/blockeed`, {fully }).then((res) => {
            this.getdataaa()
            alert("Allowed")
        })
    }
    
    
    
    

    rowDeleteHandler = (oldData) => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/userdlllt`, { id: oldData._id }).then((response) => {
            this.getdataaa()
        }
        )
    }

    DataUpdateHandler = (oldData,newData) => {
        axios.patch(`${process.env.REACT_APP_DOMAIN}/Updateuser`, newData).then((response) => {
        })
    }
   
    UpdateHandler(rowData) {
        this.props.editData(rowData)

    }

    getdataaa = () => {
        const emaail = this.state.adminnemail
        axios.post(`${process.env.REACT_APP_DOMAIN}/goo`, { emaail }).then((response) => {
            this.setState({ data: response.data })
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
            <div >
            <div className="container " style={{position:"relative"}}>

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
                    title="Company data"

                    columns={this.state.columns}
                    data={this.state.data}
                    // actions={[
                    //     {
                    //         icon: "email",
                    //         tooltip: "Send QRCODE",
                    //         onClick: (event,rowData) => this.sendEmail(rowData) 
                    //     } 
                        
                      
                    // ]}

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





















































































































































































