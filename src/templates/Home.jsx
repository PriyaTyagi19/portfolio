import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import { NavLink } from 'react-router-dom'
import image from '../assets/pt.jpg';

const Home = () => {
    const restPath = restBase + 'pages/8'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <section>
        <h1 className='screen-reader-text'>HOME</h1>
        
        { isLoaded ?
        
            <article id={`post-${restData.id}`}>
                
                <div className="content animate__animated animate__bounceInDown">

                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                    </div> 
                    <div className='link-style'>
                    <NavLink  to='/work'>See my work</NavLink>
                    <NavLink to='/about'>About me!</NavLink>
                    </div>
                   
                </div>
                <img src={image} alt="An avatar" className="avatar" id="avatar" />
            </article>
           
        : 
            <Loading /> 
        }
        </section>            
    )
}

export default Home
