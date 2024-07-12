import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Slideshow from "../components/Slideshow";

const Post = () => {
  const { slug } = useParams();
  const restPath = restBase + `portfolio-work?_embed&slug=${slug}`;
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data[0]);
        setLoadStatus(true);
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
        restData ? (
          <article key={restData.id} id={`rest-${restData.id}`}>
            <h2>{restData.title.rendered}</h2>

            <div className="feature-image">
              {restData.acf["featured-image"] && (
                <FeaturedImage
                  imageId={restData.acf["featured-image"]}
                  altText={restData.title.rendered}
                />
              )}
            </div>

            <div
              className="work-skills"
              dangerouslySetInnerHTML={{ __html: restData.acf.skillset }}
            ></div>
            <div
              className="single-work-content"
              dangerouslySetInnerHTML={{ __html: restData.acf.description }}
            ></div>
            <div className="work-url link-style">
              <a
                href={restData.acf["live-site"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Site
              </a>
              <a
                href={restData.acf["github"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </div>

            <Tabs>
              <TabList>
                <Tab>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: restData.acf.section1_heading,
                    }}
                  ></div>
                </Tab>
                <Tab>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: restData.acf.section2_heading,
                    }}
                  ></div>
                </Tab>
                <Tab>
                  {" "}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: restData.acf.section3_heading,
                    }}
                  ></div>
                </Tab>
              </TabList>

              <TabPanel>
                <div
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.section1_description,
                  }}
                ></div>
              </TabPanel>
              <TabPanel>
                <div
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.section2_description,
                  }}
                ></div>
              </TabPanel>
              <TabPanel>
                <div
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.section3_description,
                  }}
                ></div>
              </TabPanel>
            </Tabs>
            <div className="work-url all-projects">
              <NavLink to="/work">View All Projects</NavLink>
            </div>
            <Slideshow />
          </article>
        ) : (
          <p>No post found for the slug: {slug}</p>
        )
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

export default Post;
