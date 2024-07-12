import { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import { Helmet } from "react-helmet-async";

const About = () => {
  const restPath = restBase + "pages/12";
  const [restData, setData] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [restPath]);

  return (
    <>
      <a class="screen-reader-text" href="#site-main">
        Skip to content
      </a>
      {isLoaded ? (
        <>
          <Helmet>
            <title>Know me</title>
          </Helmet>

          <article id={`post-${restData.id}`}>
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: restData.content.rendered }}
            ></div>
            <article className="tech-stack">
              <div>
                <div
                  className="tech-stack-heading"
                  dangerouslySetInnerHTML={{ __html: restData.acf.heading1 }}
                ></div>
                <div
                  className="work-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.content_section1,
                  }}
                ></div>
              </div>
              <div>
                <div
                  className="tech-stack-heading"
                  dangerouslySetInnerHTML={{ __html: restData.acf.heading2 }}
                ></div>
                <div
                  className="work-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.content_section2,
                  }}
                ></div>
              </div>
              <div>
                <div
                  className="tech-stack-heading"
                  dangerouslySetInnerHTML={{ __html: restData.acf.heading3 }}
                ></div>
                <div
                  className="work-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.content_section3,
                  }}
                ></div>
              </div>
              <div>
                <div
                  className="tech-stack-heading"
                  dangerouslySetInnerHTML={{ __html: restData.acf.heading4 }}
                ></div>
                <div
                  className="work-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.content_section4,
                  }}
                ></div>
              </div>
            </article>
          </article>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default About;
