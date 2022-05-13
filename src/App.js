import './App.css';
import Tasks from './components/tasks';
import Register from './components/Register';
import Login from './components/login';
import Footer from './components/Footer';
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import {useState} from "react";

function App() {
  const [regState,setReg] = useState(false);
  const { currentUser } = useAuth();
  
  //Checks if a user is logged in
  if (currentUser == null && regState == false) {
    return <Login setRegState = {setReg}  />;
  }
//checks if user wants to register
  if(regState == true){
    return <Register setRegState = {setReg}/>
  }
  
  return (
    <>
      <div className="App h-100">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/login" element={<Login setRegState = {setReg} />} />
          <Route path="/register" element={<Register setRegState={setReg} />}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
