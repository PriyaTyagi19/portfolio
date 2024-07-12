import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";

const Slideshow = () => {
  const [projects, setProjects] = useState([]);

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
          setLoadStatus(true);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h2>WORKS</h2>
      {isLoaded ? (
        <Slider {...settings}>
          {restData.map((post) => (
            <article
              className="slider-style"
              key={post.id}
              id={`post-${post.id}`}
            >
              <div>
                {post.acf["featured-image"] && (
                  <FeaturedImage
                    imageId={post.acf["featured-image"]}
                    altText={post.title.rendered}
                  />
                )}
              </div>
              <article className="all-projects">
                <Link to={`/work/${post.slug}`}>
                  <h2>{post.title.rendered}</h2>
                </Link>
              </article>
            </article>
          ))}
        </Slider>
      ) : (
        <Loading />
      )}
    </div>
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
          setImageUrl(imageData.source_url); // Assuming 'source_url' is the image URL field in WordPress media
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
    <Loading /> // Show loading state or alternative content while image is loading
  );
};
export default Slideshow;
