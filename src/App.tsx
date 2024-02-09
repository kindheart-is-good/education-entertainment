import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "./context/cards";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./pages/Content/Content";
import Quiz from "./pages/Quiz/Quiz";
import LettersGame from "./pages/LettersGame/LettersGame";
import DynamicContentGame from "./pages/DynamicContentGame/DynamicContentGame";
import SearchPage from "./pages/SearchPage/SearchPage";
import CardLibrary from "./pages/CardLibrary/CardLibrary";
import TensesPage from "./pages/TablePage/TensesPage";
import TensesPage2 from "./pages/TablePage/TensesPage2";
import TablePage from "./pages/TablePage/TablePage";
import FromBackend from "./pages/FromBackend/FromBackend";

function App() {
  return (
    <Provider>
      <div className="app-wrapper">
        <Header />
        <Sidebar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/content/" element={<Content />} />
            <Route path="/quiz/*" element={<Quiz />} />
            <Route path="/guess-letters/*" element={<LettersGame />} />
            <Route
              path="/dynamic-content-game/*"
              element={<DynamicContentGame />}
            />
            <Route path="/search-page/*" element={<SearchPage />} />
            <Route path="/card-library/*" element={<CardLibrary />} />
            <Route path="/table-page/*" element={<TablePage />} />
            <Route path="/tenses-page/*" element={<><TensesPage2 /><TensesPage /></>} />
            <Route path="/testing-backend/*" element={<FromBackend />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
