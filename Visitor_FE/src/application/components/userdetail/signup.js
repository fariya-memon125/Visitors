import React,{useEffect,useState} from "react";
import axios from 'axios'
import "../../../App.css"


function FormPage () {

const [adminmail,setAdminmail] = useState()
const [name,setName] = useState()
const [comapnyname,setComapanyName] = useState()
const [CPassword,setCPassword] = useState()
const [NPassword,setNPassword] = useState()
const [typed, setTyped] = useState()
const [reload,setReload]=useState()
const [count,setCount]=useState()
const [imagee,setImagee] = useState()
  
  
const strength = (e) => {
  const value = (e.target.value)
  if (value.length > 0) {
      setTyped(true)
  } else setTyped(false) 
  var counter = 0;
  counter += /[@$!%*?&]/.test(value) ? 1 : 0;
  counter += /[a-z]/.test(value) ? 1 : 0;
  counter += /[A-Z]/.test(value) ? 1 : 0;
  counter += /\d/.test(value) ? 1 : 0; 
  counter += /^.{8,125}$/.test(value) ? 2 : 0;
  setNPassword(value) 
  setCount(counter) 
}
const weak = <strong className="text-danger" > weak Password</strong>
const strong = <strong className="text-success" > Strong</strong>
const title2 = <span className=" text-white"  > Password Strength: </span>

  

const changePass = (e) => {
  e.preventDefault()
  if (count < 5) return setReload('new Password is weak')
  axios.put(`${process.env.REACT_APP_DOMAIN}/changePass`, { CPassword, NPassword, adminmail }).then((res) => {
      setReload(!reload)
      if (res.data === true) {
          setReload("Password has Changed")
          setNPassword("")
          setCPassword("")
      } if (res.data === false) {
          setReload("You've Entered Wrong Password")

      }

  }).catch(err => {
      setReload('Connection Error.')
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
        console.log(res)
        setComapanyName(res.data.company)
        setName(res.data.name)
      })
    })
    
    const changePass = () => {
      if (count < 5) return setReload('new Password is weak')
      axios.put(`${process.env.REACT_APP_DOMAIN}/changePass`, { CPassword, NPassword, adminmail }).then((res) => {
          setReload(!reload)
          if (res.data === true) {
              setReload("Password has Changed")
              setNPassword("")
              setCPassword("")
          } if (res.data === false) {
              setReload("You've Entered Wrong Password")

          }

      }).catch(err => {
          setReload('Connection Error.')
      })
  }

    }, [])
    
    const imageUploadHandler = () => {
      console.log(imagee)
      console.log(444)
      if(!imagee)return
      console.log(777)
      console.log(imagee.type)
      if(imagee.type !== "image/png" && imagee.type !== "image/jpg" && imagee.type !== "image/jpeg" ) return
      console.log(imagee)
      console.log(444)
  const data = new FormData()
  data.append('file', imagee)
  console.log(data)
      axios.post(`${process.env.REACT_APP_DOMAIN}/projects-image`, data).then((res) => {
        axios.post(`${process.env.REACT_APP_DOMAIN}/save-project`, { imgSrc: res.data.imgSrc, email: adminmail }).then((res) => {
          alert("Changes Saved")
      })
  })
  // , email : adminmail
      
      

    }
    
  return (
      <div className="lollipop pt-5">
      
      
      <div className="container align-items-center w-50  bg-light">
        <h1 className="text-center">Profile:</h1>
        <h4 className="text-center">Welcome {name}</h4>
  <form>
    
  <div class="form-group">
    <label for="exampleInputEmail1">Company Name</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled placeholder={ comapnyname}/>
          </div>
  <div class="form-group">
          
    <label for="exampleInputEmail1">Image</label>
            <input type="file" class="form-control" id="exampleInputEmail1" onChange={(e)=>setImagee(e.target.files[0])} aria-describedby="emailHelp" />
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
            <input type="email" disabled class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={adminmail}/>
          </div>
          <button class="btn btn-primary mx-5" onClick={imageUploadHandler}  type="button">Save</button>






          
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
           Change Password
  </button>
  <div class="collapse" id="collapseExample">
  <div class="card card-body">
  <label for="exampleInputEmail1" className="mt-3">Current Password</label>
                                <input className="border col-12 form-control" type="password" value={CPassword} onChange={e => setCPassword(e.target.value)} placeholder="Enter current Password" />

          <br></br>
                                <label for="exampleInputEmail1">New Password</label>
                                <input className="border col-12 form-control" type="password" value={NPassword} onChange={strength} placeholder="Enter new Password" />
                                {typed ? title2 : null}{typed ? (count > 4) ? strong : weak : null}
                                <small id="emailHelp" class="form-text text-muted">{reload}</small>

                                <br></br>
                                <button onClick={changePass} className="btn btn-primary">
                Save
            </button>
              </div></div>
</form>
  </div></div>
);
};

export default FormPage;