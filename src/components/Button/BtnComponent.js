import React from 'react';
import PropTypes from 'prop-types';
import styles from './BtnComponent.module.css'; // Certifique-se de importar seus estilos corretamente

function BtnComponent({ value, onClick, children }) {
  return (
    <div className={styles.btnGroup}>
    <button 
      type="button"
      value={value}
      onClick={onClick}
    >
      {children}
    </button>
    </div>
  );
}

BtnComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default BtnComponent;