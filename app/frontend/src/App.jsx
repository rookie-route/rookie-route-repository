import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AnalyzePage from "./pages/AnalyzePage";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analyze" element={<AnalyzePage />} />
            </Routes>
        </Router>
    );
}

export default App;
