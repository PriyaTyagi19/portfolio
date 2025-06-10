import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../utilities/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { restBase } from "../utilities/Utilities";
import { Helmet } from "react-helmet-async";

const Posts = () => {
  const restPath = restBase + "portfolio-work?_embed";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(restPath);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setTimeout( () => {
          
            setLoadStatus(true);
          }, 500)
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadStatus(false);
      }
    };
    fetchData();

    AOS.init({ duration: 2000 });
  }, [restPath]);
  return (
    <>
      <h1>Works</h1>
      <a class="screen-reader-text" href="#site-main">
        Skip to content
      </a>
      {isLoaded ? (
        <>
          <Helmet>
            <title>My Work</title>
          </Helmet>
          {restData.map((post) => (
            <article
              className="works"
              data-aos="fade-up"
              key={post.id}
              id={`post-${post.id}`}
            >
              <article>
                {/* Render featured image if available */}
                <div className="feature-image">
                  {post.acf["featured-image"] && (
                    <FeaturedImage
                      imageId={post.acf["featured-image"]}
                      altText={post.title.rendered}
                    />
                  )}
                </div>
              </article>
              <article className="work-section">
                <Link to={`/work/${post.slug}`}>
                  <h2>{post.title.rendered}</h2>
                </Link>
                <div
                  className="work-skills"
                  dangerouslySetInnerHTML={{ __html: post.acf.skillset }}
                ></div>
                <div
                  className="work-content"
                  dangerouslySetInnerHTML={{ __html: post.acf.description }}
                ></div>
                <div className="work-url">
                  <Link to={`/work/${post.slug}`}>View Project</Link>
                </div>
              </article>
            </article>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
const FeaturedImage = ({ imageId, altText }) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${restBase}media/${imageId}`);
        if (response.ok) {
          const imageData = await response.json();
          setImageUrl(imageData.source_url); 
        } else {
          throw new Error("Failed to fetch image data");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, [imageId]);
  return imageUrl ? (
    <img src={imageUrl} alt={altText} style={{ maxWidth: "100%" }} />
  ) : (
    <Loading /> 
  );
};
export default Posts;
