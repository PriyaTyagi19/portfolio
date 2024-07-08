import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Post = () => {
    const { slug } = useParams();
    const restPath = restBase + `portfolio-work?_embed&slug=${slug}`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data[0])
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
        
    return (
        <>
            {isLoaded ? (
                restData ? (
                    <article key={restData.id} id={`rest-${restData.id}`}>
                        <h2>{restData.title.rendered}</h2>
                        <div className="work-skills" dangerouslySetInnerHTML={{ __html: restData.acf.skills }}></div>
                        <div className="work-content" dangerouslySetInnerHTML={{ __html: restData.acf.description }}></div>
                        <div className="work-url">
                            <a href={restData.acf['live-site']} target="_blank" rel="noopener noreferrer">
                                {restData.acf['live-site']}
                            </a>
                        </div>
                        {/* Render featured image if available */}
                        {/* {postData._embedded && postData._embedded['wp:featuredmedia'] && (
                            <figure className="featured-image">
                                <img src={postData._embedded['wp:featuredmedia'][0].source_url} alt={postData.title.rendered} />
                            </figure>
                        )} */}
                    </article>
                ) : (
                    <p>No post found for the slug: {slug}</p>
                )
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Post
