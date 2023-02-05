import dotenv from 'dotenv';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enroll from './pages/Enroll/Enroll';
import SignIn from "./pages/SignIn/SignIn";
import Translator from "./pages/Translator/Translator";
import './reset.css'
import './index.css'

function App(){
  //dotenv.config();

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/enroll" element={<Enroll/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/translator" element={<Translator/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;