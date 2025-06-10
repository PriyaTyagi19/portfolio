import { Route, Routes, NavLink } from "react-router-dom";
import Home from "./templates/Home";
import About from "./templates/About";
import Posts from "./templates/Posts";
import Post from "./templates/Post";
import Connect from "./templates/Connect";
import logo from "../src/assets/logo.svg";
import "animate.css";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { createContext, useState, useEffect } from "react";
import SunIcon from '../src/components/SunIcon';
import MoonIcon from '../src/components/MoonIcon';
// import ReactSwitch from "react-switch";


export const ThemeContext = createContext(null);

function App() {
  let currentPage = useLocation();
const [theme, setTheme] = useState(()  => {
  return localStorage.getItem('theme') || 'dark';
});


const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light"; 
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme)
};
// Apply the current theme to the document
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);


  return (
    <ThemeContext.Provider value={{theme, toggleTheme}} >
    <div id={theme} className="theme-style">
      <Helmet>
        <title>Priya Tyagi</title>
        <meta name="description" content="Hello, I am Priya Tyagi (Front-End Web Developer)" />
      </Helmet>
      <header id="masthead" className="site-header">
        <div className="logo-theme">

        <a href="/">
          <img src={logo} alt="A logo" className="logo" id="logo" />
        </a>
        <div className="theme-change" onClick={toggleTheme} >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                {/* <span>{theme === 'dark' ? 'Light' : 'Dark'}</span> */}
          
                </div>
        </div>
        <nav className="site-navigation">
          <ul>
            <li>
              <NavLink to="/" end>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                   
                    d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"
                  />
                </svg>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/work">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#54b3d6"
                    d="M12 5c3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78zm0-2c-4.006 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408-.212-3.951-3.473-7.092-7.479-7.092zm-1 14l-4-1.701v-1.599l4-1.7v1.567l-2.229.933 2.229.93v1.57zm2-5v1.567l2.229.933-2.229.93v1.57l4-1.701v-1.599l-4-1.7z"
                  />
                </svg>
                Works
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#54b3d6"
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"
                  />
                </svg>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/connect">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#54b3d6"
                    d="M19 9.062s-5.188-.333-7 1.938c2-4.896 7-5.938 7-5.938v-2l5 4-5 4.019v-2.019zm-18.974 14.938h23.947l-11.973-11.607-11.974 11.607zm1.673-14l10.291-7.488 3.053 2.218c.712-.459 1.391-.805 1.953-1.054l-5.006-3.637-11.99 8.725v12.476l7.352-7.127-5.653-4.113zm15.753 4.892l6.548 6.348v-11.612l-6.548 5.264z"
                  />
                </svg>
                Connect
              </NavLink>
            </li>
           
          </ul>
        </nav>
       
        
      </header>
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Posts />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/:slug" element={<Post />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>

      </main>
      <footer>
        {currentPage.pathname == "/connect" ? (
          <></>
        ) : (
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/priya-tyagi-600737249/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                 
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>

            <a
              href="https://github.com/PriyaTyagi19"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                 
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"
                />
              </svg>
            </a>
          </div>
        )}
        <p className="copyright">
          &copy; <span> 2024 Designed and Developed by Priya Tyagi</span>
        </p>
      </footer>
    </div>
    </ThemeContext.Provider> 
  );
}

export default App;
