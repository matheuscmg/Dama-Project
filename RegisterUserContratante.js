// function RegisterUserContratante () {
//     function listener () {
//         // Make a request for a user with a given ID
//         axios.get('http://localhost/sanctum/csrf-cookie', config 
//         )        
//         .then(function (response) {
//             // handle success
//             axios.post('localhost/api/register/user/contratante', {
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
//         <div>
//             <button onClick={listener}>Registratar Contratante</button>
//         </div>
//     )
// }

// // export default RegisterUserContratante