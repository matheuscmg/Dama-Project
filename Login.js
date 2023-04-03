// import { useState } from 'react'
// import axios from 'axios';
 
// axios.defaults.withCredentials = true;

// const config = {
//     headers:{
//         'Content-Type' : 'application/json',
//         'Accept' : 'application/json', 
//     },
// };

// function Login () {

//     const [message, setMessage] = useState()


//     function listener () {
//         // Make a request for a user with a given ID
//         axios.get('http://localhost/sanctum/csrf-cookie', config 
//         )        
//         .then(function (response) {
//             // handle success
//             axios.post('http://localhost/api/login', {
//                 email : 'randerson.lemos@gmail.com',
//                 password : '12345678',
//             })
//             .then(function (response) {
//                 // handle response
//                 console.log(response)
//                 setMessage(response.data['message'])    
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error)
//                 setMessage(error.response.data['error'].replace('.',''))
//             })
//             .finally(function () {
//                 // always-executed
//             })
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
//         .finally(function () {
//             // always executed
//         });
//     }


//     return (
//     <div>
//         {message 
//         ? (message) 
//         :(<button onClick={listener}>Login {message} </button>)        
//         }
//     </div>
//     );
// }

// export default Login