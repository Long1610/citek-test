import "./App.css";
import data from "./data";
import { useState, useEffect, useCallback } from "react";
import moment from "moment";

function App() {
  const { headline, source, byline, publicationDate, blocks } = data;
  const [dataToggle, setDataToggle] = useState([]);

  const fetdata = useCallback(() => {
    fetch("https://api.jsonbin.io/b/61081390f098011544a9ead8/1.")
      .then((res) => res.json())
      .then((json) => {
        setDataToggle(json);
      });
  }, []);

  useEffect(() => {
    fetdata();
  }, [fetdata]);


  const TextComponent = ({ text }) => {
    return <p className="text-block">{text}</p>;
  };

  const ImageComponent = ({ captionText, url }) => {
    return (
      <div className="image-block">
        <img src={url} alt=""/>
        <p className="text-block">{captionText}</p>
      </div>
    );
  };

  const QuoteComponent = ({ text, attribution }) => {
    return (
      <div className="quote-block">
        <p className="text-block">{text}</p>
        <p className="text-block">{attribution}</p>
      </div>
    );
  };

  const ListComponent = ({ list }) => {
    return (
      <ol className="list">
        {list.map((x, id) => (
          <li>{x}</li>
        ))}
      </ol>
    );
  };

  const renderComponent = (value) => {
    if (value.kind === "text") {
      return <TextComponent text={value.text} />;
    } else if (value.kind === "image") {
      return <ImageComponent captionText={value.captionText} url={value.url} />;
    } else if (value.kind === "ordered-list") {
      return <ListComponent list={value.list} />;
    } else {
      return (
        <QuoteComponent text={value.text} attribution={value.attribution} />
      );
    }
  };

  return (
    <div className="App">
      <h1>{headline}</h1>
      <div className="author">
        <span>{byline}</span>
        <span>,</span>
        <span>{source}</span>
      </div>
      <p>{moment(publicationDate).format("dddd, MMMM Do YYYY, h:mmA")}</p>
      <div className="line"></div>
      <div>{blocks.map((x) => renderComponent(x))}</div>
      <div className="wrapper-button">
        <button onClick={fetdata}>Toggle Button</button>
      </div>
      <ol>
        {dataToggle?.map((x, index) => {
          return renderComponent(x);
        })}
      </ol>
    </div>
  );
}

export default App;
