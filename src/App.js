import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./pages/Dashboard/Dashboard";
import Password from "./pages/Password";
import About from "./pages/About";
import Logout from './pages/Logout'

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/password" element={<Password />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
