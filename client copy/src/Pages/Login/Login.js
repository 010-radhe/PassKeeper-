import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../axios/instance";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setName, setPasswords } from "../../redux/actions";
import { passwordContext } from "../../store/Context/PasswordContextProvider";

function Login()
{
  const {state,setAuth,setName,setPasswords}=useContext(passwordContext)
 const {isAuthenticated}=state
 console.log("login compone");
 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  }); 

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    console.log("name ",name," value ",value);
    
    setUserData((prevData) =>
    {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleLogin = async () =>
  {
    try
    {
      console.log("user data ",userData);
      
      const res = await loginUser(userData);
      console.log("res of log in ",res.data);
      const {data}=res.data;
      
      
      if (res.status === 200)
      {
        
        
        //1) this toast not showing reason: may be navigation changing 
        
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       });
      setAuth(true);  
      setTimeout(()=>{
        navigate("/");
      },2000)
        // setPasswords(data.passwords) 
        // console.log("data ",data.name,"pass ",data.passwords);
        
      }
    } 
    catch (error)
    {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("error in Login.js ",error);
    }
  };

  // useEffect(() =>
  // {
  //   isAuthenticated && navigate("/", { replace: true });
  // }, [isAuthenticated, navigate]);

  return (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />

      <div className="login__wrapper">
        <div className="login_left">
          <div className="inputs">
            <label> Email </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
          </div>

          <div className="inputs">
            <label> Password </label>
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>

          <p>
            Did not have any account? <Link to="/signup">Signup</Link>
          </p>

          <button onClick={handleLogin}> Login </button>
        </div>

        <div className="login_right">
          <img src={img} alt="login.jpg" />

          <div className="login__content">
            <h1> Login </h1>
            <h4> Get your password secured with us for free. </h4>

            <p>
              Did not have any Account?
              <Link to="/signup"> Signup </Link>
            </p>

            <a
              className="attr"
              href="https://www.freepik.com/vectors/star"
              target="_blank"
              rel="noreferrer"
            >
            
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
