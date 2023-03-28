import React, { useState } from 'react';
import axios from 'axios';


function Hello () {

    const [greeting, setGretting] = useState();

    function listener () {
        // Make a request for a user with a given ID
        axios.get('http://localhost/api/hello')
        .then(function (response) {
            // handle success
            setGretting(response.data['message'])
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
            { greeting 
                ? (greeting)
                : (<button onClick={listener}>Salve Galera</button>)
            }       
        </div>
    )
}

export default Hello