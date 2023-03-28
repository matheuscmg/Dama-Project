import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import axios from 'axios';
import "./styles.css";

import Hello from './components/Hello'


// axios.defaults.withCredentials = true;


function App() {
//   const [name, setName] = useState('');
//   const [isLogged, setIsLogged] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);

//   const handleLogin = (event) => {
//     //Prevent page reload
//     event.preventDefault()
//     var email = document.querySelector('input#login-email').value
//     var password = document.querySelector('input#login-password').value
 
//     console.log(`email: ${email}\npassword: ${password}`)

//     axios.get('http://localhost/sanctum/csrf-cookie'
//     ).then(
//       (response) => {
//         axios.post('http://localhost/api/login', { email : email, password : password,}
//         ).then(
//           (response) => {
//             axios.get('http://localhost/api/me'
//             ).then(
//               (response) => {
//                 console.log(response)
//                 setName(response.data.name)
//                 setIsLogged(true) 
//               }
//             ).catch(
//               (error) => { console.log(error) }
//             )
//           }
//         ).catch(
//           (error) => { console.log(error) }
//         )
//       }
//     ).catch(
//       (error) => { console.log(error) }
//     )
//   }

//   const handleRegister = (event) => {
//     //Prevent page reload
//     // event.preventDefault()
//     // var email = document.querySelector('input#email').value
//     // var password = document.querySelector('input#password').value
 
//     // console.log(`email: ${email}\npassword: ${password}`)

//     // axios.get('http://localhost/sanctum/csrf-cookie'
//     // ).then(
//     //   (response) => {
//     //     axios.post('http://localhost/api/login', { email : email, password : password,}
//     //     ).then(
//     //       (response) => {
//     //         // setToken(response.data.token)
//     //         // setMessage(response.data.message)
//     //         // setIsLogged(true) 
//     //         console.log(response)
//     //       }
//     //     ).catch(
//     //       (error) => { console.log(error) }
//     //     )
//     //   }
//     // ).catch(
//     //   (error) => { console.log(error) }
//     // )
//     console.log('Register')
//   }
  
//    // JSX code for login form
//   const renderForm = (
//     <div className="form">

//       <form onSubmit={handleLogin}>        
//         <div className="input-container-login">
//           <label>Email </label>
//           <input id='login-email' type='email' name='login-email' required />
//           <label>Password </label>
//           <input id='login-password' type='password' name='login-password' required />
//         </div>
//         <div className="button-container">
//           <input name='login' type='submit' value='Login'  />
//         </div>
//       </form>

//       <form onSubmit={handleRegister}>
//         <div className="input-container-register">
//           <label>Email </label>
//           <input id='register-email' type='email' name='register-email' required />
//           <label>Password </label>
//           <input id='register-password' type='password' name='register-password' required />
//         </div>
//         <div className="button-container">
//           <input name='login' type='submit' value='Register'  />
//         </div>
//       </form>    

//     </div>
//   );

  // return (
  //   <div className="app">
  //     <div className="login-form">
  //       <div className='title'> Welcome!!!</div>
  //       {isLogged ? <div>{name}, make yourself comfortable...</div>: renderForm}
  //     </div>
  //   </div>
  // );
  return (
    <div className="app">
        <Hello></Hello>
    </div>
  );
}

export default App;