import { Route, Routes, Link, NavLink } from 'react-router-dom'
import Home from './templates/Home'
import About from './templates/About'
import Posts from './templates/Posts'
import Post from './templates/Post'
import Connect from './templates/Connect'
import './styles/style.css'
import logo from '../src/assets/logo.svg'


function App() {

  return (
    <>
      <header id="masthead" className="site-header">
      <img src={logo} alt="A logo" className="logo" id="logo" />
        <nav className="site-navigation">
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/work'>Works</NavLink></li>
            <li><NavLink to='/connect'>Connect</NavLink></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/work' element={<Posts />} />
          <Route path='/work/:slug' element={<Post />} />
          <Route path='/connect' element={<Connect />} />
        </Routes>
      </main>
      <footer>
        <nav className="site-navigation">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><NavLink to='/work'>Works</NavLink></li>
            <li><Link to='/connect'>Connect</Link></li>
          </ul>
        </nav>
       <p className="copyright"> 2024 Designed and Developed by Priya Tyagi</p>
      </footer>
    </>
  )
}

export default App
