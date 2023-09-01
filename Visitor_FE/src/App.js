import React , { useState  , useEffect} from 'react'
import { BrowserRouter as Router,Link, Switch, Route, Redirect } from 'react-router-dom'    
import SignUp from './userAccess/signUp/signup'
import Login from './userAccess/Login/login'
import ForgotPassword from './userAccess/Login/forgotPassword/forgotPassword'
import Reset from './userAccess/Login/forgotPassword/resetPassword/resetPassword'
import ForgotUsername from './userAccess/Login/forgotUsername/forgotUsername'
import ResetUsername from './userAccess/Login/forgotUsername/resetUsername/resetUsername'
import Activate from './userAccess/signUp/accountActivation/activate'
import Dashboard from "./application/components/Material Table/Data"
import Visitortable from './application/components/Forvisitorlogin/Choices'
import Userdetail from "./application/components/userdetail/signup"
import Authy from "./application/components/Authy/Authhh"  
import axios from "axios"
import { FaUser, FaTable, FaSignOutAlt, FaUserShield, FaEye,FaUserFriends ,FaUserSecret} from 'react-icons/fa'
import Createuser from './application/components/createuser/Createuser'
import './App.css'
function App (){    
    
    
    const [forvisitorr, setFrovisitorr] = useState(false)
    const [supee,setSupee] = useState()
    const [tokeen,setTokeen] = useState(localStorage.getItem("token"))
    const [user,setUser] = useState()
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${process.env.REACT_APP_DOMAIN}/tellToken`,{
            headers: {
              'authorization':`Bearer ${token}` 
            }
        }).then((res) => {
            setFrovisitorr(res.data.check);
            setSupee(res.data.role)
          })
    }, [])
      
    
    function logoutcaller(params) {
        return (
            localStorage.clear("token"),
            <Redirect component={Login}/>,
            window.location.reload(true),null
        )
    }
      
      
    
    
    
        return (
            <div className="">
                <Router>

                    



                    {tokeen ? (forvisitorr ? <Redirect to="/VisitorTable" /> :supee ==="superadmin" ? <div>        <nav class="navbar box  navbar-expand-lg navbar-light bg-dark">
                        <Link to="/Dashboard" class="navbar-brand" style={{ fontWeight: "bold", color: "white" }}><FaEye size="50" className="mx-4" />VISITOR APP</Link>
                        <button class="navbar-toggler navbar-toggler-icon  bg-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item">
                                    <Link to="/Dashboard" className="nav-link text-light btn" ><FaUserShield size="25" className="mx-2" />Dashboard</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/VisitorTable" className="nav-link text-light btn "><FaTable size="25" className="mx-2" />Visitor Forms</Link>
                                </li>
                                <li class="nav-item">
            
                                    <Link to="/details" className="nav-link text-light btn"><FaUser size="25" className="mx-2" />User</Link>

                                </li>
                                <li class="nav-item">
                                    <Link to="/authentication" className="nav-link text-light btn"><FaUserSecret size="25" className="mx-2" />Auth</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to="/Create-User" className="nav-link text-light btn"><FaUserFriends size="25" className="mx-2" />Create User</Link>
                                </li>
              
                                <span onClick={() => logoutcaller()} className="nav-link  btn text-danger"><FaSignOutAlt size="25" className="mx-2" />Log Out</span>
                            </ul>
                        </div>
                    </nav>
                    </div>:supee==="user"? <nav  class="navbar box  navbar-expand-lg navbar-light bg-dark">
                    <Link to="/Dashboard" class="navbar-brand" style={{fontWeight:"bold",color:"white"}}><FaEye size="50" className="mx-4"/>VISITOR APP</Link>
  <button class="navbar-toggler navbar-toggler-icon  bg-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
      <Link to="/Dashboard" className="nav-link text-light btn" ><FaUserShield size="25" className="mx-2" />Dashboard</Link>
      
                                        </li>
      <li class="nav-item">
      <Link to="/VisitorTable" className="nav-link text-light btn "><FaTable size="25" className="mx-2" />Visitor Forms</Link>
      
                                        </li>
              
              
      <span  onClick={()=>logoutcaller()} className="nav-link  btn text-danger"><FaSignOutAlt size="25" className="mx-2"/>Log Out</span>
    </ul>
  </div>
</nav>:<div>
            <nav  class="navbar box  navbar-expand-lg navbar-light bg-dark">
                    <Link to="/Dashboard" class="navbar-brand" style={{fontWeight:"bold",color:"white"}}><FaEye size="50" className="mx-4"/>VISITOR APP</Link>
  <button class="navbar-toggler navbar-toggler-icon  bg-light" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
      <Link to="/Dashboard" className="nav-link text-light btn" ><FaUserShield size="25" className="mx-2" />Dashboard</Link>
      
                                        </li>
      <li class="nav-item">
      <Link to="/VisitorTable" className="nav-link text-light btn "><FaTable size="25" className="mx-2" />Visitor Forms</Link>
      
                                        </li>
            <li class="nav-item">
            <Link to="/details" className="nav-link text-light btn"><FaUser size="25" className="mx-2" />User</Link>
                                        </li>
                                        <li class="nav-item">
                                    <Link to="/Create-User" className="nav-link text-light btn"><FaUserFriends size="25" className="mx-2" />Create User</Link>
                                </li>
              
              
      <span  onClick={()=>logoutcaller()} className="nav-link  btn text-danger"><FaSignOutAlt size="25" className="mx-2"/>Log Out</span>
    </ul>
  </div>
</nav></div>):<Redirect component={Login}/>}


























                    
                    <Switch>
                        <Route path="/signUp" component={SignUp} />
                        <Route path="/account-activation/:id" component={Activate} />
                        <Route path="/" exact component={Login} />
                        <Route path="/forgotPassword" component={ForgotPassword} />
                        <Route path="/resetPassword/:id" component={Reset} />
                        <Route path="/forgotUsername" component={ForgotUsername} />
                        <Route path="/resetUsername/:id" component={ResetUsername} />
                        <Route path="/Dashboard" component={Dashboard} />
                        <Route path="/VisitorTable" component={Visitortable} />
                        <Route path="/details" component={Userdetail} />
                        <Route path="/authentication" component={Authy}/>
                        <Route path='/Create-User' component={Createuser}/>
                    </Switch>
                </Router>
            </div>
        )
    }

export default App