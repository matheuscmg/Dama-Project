import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import axios from 'axios';
import "./styles.css";

import Hello from './components/Hello'
import Login from './components/Login'



function App() {
  return (
    <div className="app">
        <Hello></Hello>
        <Login></Login>
    </div>
  );
}

export default App;