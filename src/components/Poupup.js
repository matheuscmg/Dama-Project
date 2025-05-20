import React from "react";
import styles from "./Poupup.module.css";

function Popup({ message, type }) {
  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      {message}
    </div>
  );
}

export default Popup;