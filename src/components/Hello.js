import { useState } from 'react';
import axios from './axios/axiosLaravelConfig';

function Hello () {

    const [message, setMessage] = useState();

    function listener () {
        axios.get('/hello').then(
            function (response) {
                console.log(response)
                setMessage(response.data['message'])
            }
        ).catch(
            function (error) {
                console.log(error)
            }
        )
    }

    function cleaner(){
        setMessage('')
    }
    
    return (
        <div>
            <div>
                <button onClick={listener}>{message ? message : 'hi'}</button>
                <button onClick={cleaner}>refresh</button>   
            </div>
        </div>
    )
}

export default Hello