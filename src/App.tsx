import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import EmptyPage from "./pages/EmptyPage/Emptypage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={`/search`} element={<SearchPage />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
