import styles from './App.module.css';
import { Routes, Route} from 'react-router-dom';

import Landingpage from './pages/User/Landingpage';


function App() {
  return (
    <div className={styles.container}>
      <Landingpage/>
    </div>
  );
}

export default App;
