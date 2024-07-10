import { Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./templates/Home";
import About from "./templates/About";
import Posts from "./templates/Posts";
import Post from "./templates/Post";
import Connect from "./templates/Connect";
import homeicon from "../src/assets/homeicon.svg";
import workicon from "../src/assets/workicon.svg";
import connecticon from "../src/assets/connecticon.svg";
import abouticon from "../src/assets/abouticon.svg";
import linkedinicon from "../src/assets/linkedinicon.svg";
import githubicon from "../src/assets/github.svg";
import logo from "../src/assets/logo.svg";

function App() {
  return (
    <>
      <header id="masthead" className="site-header">
        <a href="/">
          <img src={logo} alt="A logo" className="logo" id="logo" />
        </a>
        <nav className="site-navigation">
          <ul>
            <li>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill={remove === false ? "#3ff0af" : "#ff0000"} d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg> */}
              <NavLink to="/" end>
                <img src={homeicon} alt="a home icon"></img>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <img src={abouticon} alt="an about icon"></img>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/work">
                <img src={workicon} alt="a work icon"></img>
                Works
              </NavLink>
            </li>
            <li>
              <NavLink to="/connect">
                <img src={connecticon} alt="a connect icon"></img>
                Connect
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Posts />} />
          <Route path="/work/:slug" element={<Post />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </main>
      <footer>
        <div className="social-icons">

        <a
          href="https://www.linkedin.com/in/priya-tyagi-600737249/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedinicon} alt="A linkedin Icon" />
        </a>

        <a
          href="https://github.com/PriyaTyagi19"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubicon} alt="A github Icon" />
        </a>
        </div>
        <p className="copyright">
          &copy; <span> 2024 Designed and Developed by Priya Tyagi</span>
        </p>
      </footer>
    </>
  );
}

export default App;
