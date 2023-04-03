import { useState } from 'react'
import axios from './axios/axiosLaravelConfig'

function Login () {

    const [message, setMessage] = useState()

    function listener () {
        axios.post('/login', {
            email : 'randerson.lemos@gmail.com',
            password : '12345678'
        }).then( 
            function (response) {
                console.log(response)
                setMessage(response.data['message'].toLowerCase())
            }
        ).catch(
            function (error) {
                console.log(error)
            }
        )
    }

    function cleaner () {
        setMessage()
    }

    return (
        <div>
            <button onClick={listener}>{message ? message : 'login'}</button>
            <button onClick={cleaner}>refresh</button>   
        </div>
    )
}

export default Login
