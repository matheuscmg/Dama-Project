import React, { useState } from "react";
import styles from "./ModalComponent.module.css";
import { AiOutlineClose } from "react-icons/ai";


function ModalComponent({ isOpen, onClose, children,title}) {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.closed}>
          {title && <h2>{title}</h2>}
            <button onClick={onClose}><AiOutlineClose/></button>
          </div>
          <div className={styles.formModal}>{children}</div>
        </div>
      </div>
    )
  );
}

export default ModalComponent;
