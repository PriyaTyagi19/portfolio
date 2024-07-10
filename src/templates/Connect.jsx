import { useState, useEffect } from "react";
import Loading from "../utilities/Loading";
import { restBase } from "../utilities/Utilities";
import linkedinicon from "../assets/linkedinicon.svg";
import githubicon from '../assets/github.svg';

const Connect = () => {
  const restPath = restBase + "pages/14";
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
      {isLoaded ? (
        <article id={`post-${restData.id}`}>
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: restData.content.rendered }}
          ></div>
          <div className="email-section">
          <a href="mailto:priyatyagi1905@gmail.com">Email Me!</a>
          <p>Reach out to me through LinkedIn </p>
          </div>
          
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/priya-tyagi-600737249/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinicon} alt="A linkedin Icon" />
            </a>

            <a
              href="https://github.com/PriyaTyagi19"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubicon} alt="A github Icon" />
            </a>
          </div>
        </article>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Connect;
