import React,{useState,useEffect} from 'react'
import "../../../App.css"
import axios from "axios"
import DataTable from './creatytable'
export default function Createuser() {


  const [adminmail, setAdminmail] = useState();
  const [companyname, setComapanyName] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [manager, setManager] = useState();

  
  const submitnewuser = (e) => {
    var data = { adminmail, company:companyname,manager, name, email, password }
    axios.post(`${process.env.REACT_APP_DOMAIN}/newuser`, data).then((res) => {
      alert(res.data)
      window.location.reload(true)
    })
  }
      
  useEffect(() => {
    var valueapi= null  
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
        headers: {
          'authorization':`Bearer ${token}` 
        }
    }).then((res) => {
      valueapi= res.data.email
      setAdminmail(res.data.email)
      
    }).then(() => {
      const emaily = valueapi
      axios.post(`${process.env.REACT_APP_DOMAIN}/dataed`, { emaily }).then((res) => {
        setComapanyName(res.data.company)
      })
    })
    
    }, [])

    
  return (
        <div className=" lollipop d-flex justify-content-center d-flex row" style={{height:"100%"}}>
            <div  className="mt-5 col-sm-12 col-md-6 col-lg-4">
            <form  className="mt-5">
  <div class="row mb-4">
    <div class="col">
      <div class="form-outline">
        <label class="form-label" for="form3Example1">Company Name:</label>
        <input type="text" id="form3Example1" disabled value={companyname} class="form-control" />
      </div>
      <div class="form-outline">
        <label class="form-label" for="form3Example1">Manager Name:</label>
        <input type="text" id="form3Example1" onChange={(e)=>setManager(e.target.value)} class="form-control" />
      </div>
    </div>
    <div class="col">
      <div class="form-outline">
        <label class="form-label" for="form3Example2">Office Location:</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} id="form3Example2" class="form-control" />
      </div>
    </div>
  </div>

  <div class="form-outline mb-4">
    <label class="form-label" for="form3Example3">Email address:</label>
    <input type="email" onChange={(e)=>setEmail(e.target.value)} id="form3Example3" class="form-control" />
  </div>

  <div class="form-outline mb-4">
    <label class="form-label" for="form3Example4">Password:</label>
    <input type="text" id="form3Example4" onChange={(e)=>setPassword(e.target.value)} class="form-control" />
  </div>

  <button type="button" onClick={(e)=>submitnewuser(e)} class="btn btn-primary btn-block mb-4">Sign up</button>

        </form>
      </div>
      <div className="p-5">
      <DataTable />
      </div>
        </div>
    )
}
