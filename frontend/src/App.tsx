import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GeneratePage from "./pages/GeneratePage";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <Router>
      <header className="header">
        <nav className="nav container">
          <div className="logo">ShortLink</div>
          <div className="nav-buttons">
            <Link to="/" className="nav-button">Generate</Link>
            <Link to="/statistics" className="nav-button">Statistics</Link>
          </div>
        </nav>
      </header>

      <main className="main container">
        <Routes>
          <Route path="/" element={<GeneratePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
