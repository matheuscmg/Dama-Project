import React, { useState } from "react";
import ReactDOM from "react-dom";
import api from "./requests/api";
import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      email: "joao@email.com",
      password: "joao"
    },
    {
      email: "cesar@email.com",
      password: "cesar"
    }
  ];

  const errors = {
    email: "invalid email",
    password:  "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log('Submit')
    // setErrorMessages({ name: "email", message: '' });
    // setErrorMessages({ name: "password", message: '' });

    // console.log('Hello');

    // var { email, password } = document.forms[0];
    // // Find user login info
    // const userData = database.find((elem) => elem.email === email.value);   
    // // Compare user info
    // if (userData) {
    //   if (userData.password !== password.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "password", message: errors.password });
    //   } else {
    //     console.log('Estamos logados!!!')

    //   //   api.post('/rota', {
    //   //     email:'randerson',
    //   //   }).then((response)=>{
    //   //     console.log(response)          
    //   //   }).catch((error)=>{
    //   //     console.log(error)
    //   //   }
    //   //   ) //DOCUMENTAÇÃO
    //   //   setIsSubmitted(true);
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "email", message: errors.email });
    // }
  };

  function register() {
    console.log('__Register')
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <input name='login' type="submit" value="Login"  />
          <button className="register-button" onClick={register}>Register</button>

        </div>
      </form>
    </div>
  );
  
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;