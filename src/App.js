import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <>
        <Header />
        <br/>
        <br/>
        <br/>
        <Routes>
          <Route  element={<Home/>} path='/' />
        </Routes>
    </>
  );
}

export default App;
