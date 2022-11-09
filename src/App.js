import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import QuizContainer from "./components/Quiz/QuizContainer";

function App(props) {
    return (
        <div className='globalTheme'>
            <div className='app-wrapper'>
                <Header/>
                <Sidebar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/"
                               element={<Content />} />
                        <Route path="/content/"
                               element={<Content />} />
                        <Route path="/quiz/*"
                               element={<QuizContainer />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
