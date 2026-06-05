import { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Helmet } from "react-helmet-async";

const About = () => {
  const restPath = restBase + "pages/14";
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
        }, 100)
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

            <Tabs>
              <TabList>
                <Tab>
                  <div
                    dangerouslySetInnerHTML={{ __html: restData.acf.heading1 }}
                  ></div>
                </Tab>
                <Tab>
                  <div
                    dangerouslySetInnerHTML={{ __html: restData.acf.heading2 }}
                  ></div>
                </Tab>
                <Tab>
                 
                  <div
                    dangerouslySetInnerHTML={{ __html: restData.acf.heading3 }}
                  ></div>
                </Tab>
                
              </TabList>

              <TabPanel>
                <div
                  className="work-skills about-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.section1,
                  }}
                ></div>
              </TabPanel>
              <TabPanel>
                <div
                  className="work-skills about-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.section2,
                  }}
                ></div>
              </TabPanel>
              <TabPanel>
                <div
                  className="work-skills about-skills"
                  dangerouslySetInnerHTML={{
                    __html: restData.acf.section3,
                  }}
                ></div>
              </TabPanel>
              
            </Tabs>

          </article>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default About;
