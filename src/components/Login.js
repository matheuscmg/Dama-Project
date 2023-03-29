import { useState } from 'react'
import axios from 'axios';
 
axios.defaults.withCredentials = true;

const config = {
    headers:{
        'Content-Type': 'application/json',
    },
};

function Login () {

    const [message, setMessage] = useState();

    function listener () {
        // Make a request for a user with a given ID
        axios.get('http://localhost/sanctum/csrf-cookie', config 
        )        
        .then(function (response) {
            // handle success
            axios.get('http://localhost/api/login', config
            )
            .then(function (response) {
                
            })


        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }


    return (
    <div>
        <button onClick={listener}>Login {message}</button>
    </div>
    );
}

export default Login