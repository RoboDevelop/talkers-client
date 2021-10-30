import React, { useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext"

const Signup = (props) => {

  const context = useContext(noteContext);
  const {setmyusername} = context;


  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();


  const routeChange = ()=> { 
    let path = `/main-page/chats`; 
    history.push(path);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password === credentials.cpassword){

      const response = await fetch("https://talkers0.herokuapp.com/api/user/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.usertoken) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.usertoken);
        setmyusername(credentials.username);
        history.push("/main-page/chats");
      } 
      else if(json.error) {
        alert(json.error);
      }
      else {
        alert("Invalid credentials");
      }
    }
    else{
      alert("Passwords do not match");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="text-center">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1>
            <strong>
              <i> T</i>
            </strong>
          </h1>
          <h1 className="h3 mb-3 fw-normal">Welcome To Talkers</h1>
          <p> Please sign up</p>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={credentials.email}
              onChange={onChange}
              id="username"
              name="username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating" style={{marginTop:"-10px"}}>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={credentials.cpassword}
              onChange={onChange}
              name="cpassword"
              id="cpassword"
            />
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>


          {/* <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div> */}
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Sign up
          </button>
          <p className="mt-4 mb-3 text-muted">
            Already a user? <Link to="/">Sign In</Link>
          </p>
          <p className="mt-3 mb-3 text-muted">© 2017–2021</p>
        </form>
      </main>
    </div>
  );
}

export default Signup;