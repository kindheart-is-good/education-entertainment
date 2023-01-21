import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Quiz from "./components/Quiz/Quiz";
import FromBackend from "./components/FromBackend/FromBackend";
import LettersGame from "./components/LettersGame/LettersGame";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Sidebar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/"
                           element={<Content/>}/>
                    <Route path="/content/"
                           element={<Content/>}/>
                    <Route path="/quiz/*"
                           element={<Quiz/>}/>
                    <Route path="/guess-letters/*"
                           element={<LettersGame/>}/>
                    <Route path="/testing-backend/*"
                           element={<FromBackend/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
