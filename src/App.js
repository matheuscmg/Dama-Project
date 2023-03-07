import React, { useState } from "react";
// import ReactDOM from "react-dom";
import axios from 'axios';
import "./styles.css";


axios.defaults.withCredentials = true;


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault()
    var email = document.querySelector('input#email').value
    var password = document.querySelector('input#password').value
 
    console.log(`email: ${email}\npassword: ${password}`)

    axios.get('http://localhost/sanctum/csrf-cookie'
    ).then(
      (response) => {
        axios.post('http://localhost/api/login', { email : email, password : password,}
        ).then(
          (response) => {
            setToken(response.data.token)
            setMessage(response.data.message)
            setIsLogged(true) 
          }
        ).catch(
          (error) => { console.log(error) }
        )
      }
    ).catch(
      (error) => { console.log(error) }
    )

  }
  
   // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input id='email' type='email' name='email' required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input id='password' type='password' name='password' required />
        </div>
        <div className="button-container">
          <input name='login' type='submit' value='Login'  />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isLogged ? <div>{message} with Token {token}</div>: renderForm}
      </div>
    </div>
  );
}

export default App;