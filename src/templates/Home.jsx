import { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import { NavLink } from "react-router-dom";
import image from "../assets/pt.jpg";
import Slideshow from "../components/Slideshow";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const restPath = restBase + "pages/8";
  console.log("Endpoint URL is:", restPath);
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
     
        setTimeout( () => {
          
          setLoadStatus(true);
        }, 100);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <>
      <a className="screen-reader-text" href="#site-main">
        Skip to content
      </a>

      {isLoaded ? (
        <>
          <Helmet>
            <title>Priya Tyagi- Front-End Web Developer</title>
          </Helmet>
          <article id={`post-${restData.id}`}>
            <div className="content animate__animated animate__bounceInDown">
              <div
                className="entry-content"
                dangerouslySetInnerHTML={{ __html: restData.content.rendered }}
              ></div>
              <div className="link-style">
                <NavLink to="/work">See my work</NavLink>
                <NavLink to="/about">About me!</NavLink>
              </div>
            </div>
            <img src={image} alt="An avatar" className="avatar" id="avatar" />

            <Slideshow />
          </article>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
