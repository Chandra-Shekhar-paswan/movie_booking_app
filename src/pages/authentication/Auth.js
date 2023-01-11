import { DropdownButton, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Auth = () => {
  const [showSignUp, setShowSignup] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("CUSTOMER");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const redirectURL =()=>{
    navigate("/");
  }

  useEffect(()=>{
    if (localStorage.getItem("token")){
      redirectURL();
    }
  })

  const updateSignUpData = (e) => {
    const id = e.target.id;
    if (id === "userid") {
      setUserId(e.target.value);
    } else if (id === userName) {
      setUserName(e.target.value);
    } else if (id === userType) {
      setUserType(e.target.value);
    } else if (id === "password") {
      setPassword(e.target.value);
    } else if (id === email) {
      setEmail(e.target.value);
    } 
    setErrorMessage("");
    setMessage("");
  };

  const validateData=(data)=>{
    if(data.userId.included(' ')){
      setErrorMessage("User Id should not contain spaces")
      return false;
    }
    if(data.userId.length <5 || data.userId.length >10){
      setErrorMessage("User Id shouldbe 5 to 10 charetors long")
      return false;
    }
    if(data.password.length <6 || data.password.length >10){
      setErrorMessage("Password shouldbe 6 to 10 charetors long")
      return false;
    }
    if(data.password.included(' ')){
      setErrorMessage("Password shuld not contain spaces")
      return false;
    }
    if(data.userName.length <6 || data.userName.length >10){
      setErrorMessage("User Name shouldbe 6 to 10 charetors long")
      return false;
    }
    if(data.userName.included(' ')){
      setErrorMessage("User Name shuld not contain spaces")
      return false;
    }
    else {
      return true;
    }
  }

  const singupFn =(e)=>{
    e.preventDefault();
    console.log("Signup Fn Ok")    
  } 

  const loginFn =(e)=>{
    e.preventDefault();
    console.log("Login Fn Ok")
  }

  const handleSelect = (e) => {
    setUserType(e);
  };

  const clearState = () => {
    setUserId("");
    setUserName("");
    setEmail("");
    setPassword("");
    setUserType("CUSTOMER");
    setMessage("");
    setErrorMessage("");
  }

  const toggleSignUp = () => {
    clearState();
    setShowSignup(!showSignUp);
  };

  return (
    <div id="loginPage">
      <div className="bg-dark vh-100 d-flex justify-content-center align-items-center ">
        <div
          className="card p-3 rounded-4 shadow-ls"
          style={{ widht: 20 + "rem" }}
        >
          <h4 className="text -center text-dark">
            {showSignUp ? "Sign Up" : "Log In"}
          </h4>
          <form onSubmit={(showSignUp) ? singupFn : loginFn}>
            <div className="input-group">
              <input
                type="text"
                className="form-control m-1"
                id="userid"
                placeholder="User Id"
                value={userId}
                onChange={updateSignUpData}
                autoFocus
                required
              />
            </div>
            {showSignUp && (
              <>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control m-1"
                    id="Userame"
                    placeholder="User Name"
                    required
                  />
                </div>

                <DropdownButton
                  align="end"
                  title={userType}
                  id="userType"
                  varient="dark"
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                  <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                </DropdownButton>

                <div className="input-group">
                  <input
                    type="Email"
                    className="form-control m-1"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </>
            )}
            <div className="input-group">
              <input
                type="password"
                className="form-control m-1"
                id="password"
                placeholder="Password"
                value={password}
                onChange={updateSignUpData}
                autoFocus
                required
              />
            </div>
            <div className="input-group">
              <input
                type="submit"
                className="btn btn-dark fw-bolder"
                value={showSignUp ? "Sign Up" : "Log In"}
              />
            </div>
            <div
              className="m-1 tect-center text-primary"
              onClick={toggleSignUp}
            >
              {showSignUp
                ? "Already have an account ? Log In"
                : "Don.t have an account ? Sign Up"}
            </div>
            <div className="auth-error-msg text-success text-center">
              {message}
            </div>
            <div className="auth-error-msg text-danger text-center">
              {errorMessage}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
