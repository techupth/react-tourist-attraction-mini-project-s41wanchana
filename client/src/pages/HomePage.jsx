import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [searchWord, setSearchWord] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, [searchText]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const openInNewTap = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="Background">
      <header>
        <h1>เที่ยวไหนดี</h1>
      </header>
      <div className="Input-Bar">
        <label>ค้นหาที่เที่ยว</label>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          onChange={handleSearch}
          value={searchText}
        />
      </div>
      <div className="Search-Result-Container">
        {data.map((item) => {
          return (
            <div className="Result-Container" key={item.eid}>
              <div className="Main-Photo-Container">
                <img
                  className="Main-Photo"
                  src={item.photos[0]}
                  alt={item.tags[0]}
                />
              </div>
              <div className="Content-Preview">
                <h3
                  onClick={() => {
                    openInNewTap(item.url);
                  }}
                >
                  {item.title}
                </h3>
                <p>{item.description.substring(0, 100)}</p>
                <p
                  className="Clickable"
                  onClick={() => {
                    openInNewTap(item.url);
                  }}
                >
                  อ่านต่อ
                </p>
                <p className="Tags">
                  หมวดหมู่:
                  {(() => {
                    const tagsCopy = [...item.tags];
                    tagsCopy.splice(tagsCopy.length - 1, 0, "และ");
                    return tagsCopy.map((tag, index) => {
                      if (tag !== "และ") {
                        return (
                          <span className="Styled-Span" key={index}>
                            {tag}
                          </span>
                        );
                      } else {
                        return (
                          <span className="No-Style-Span" key={index}>
                            {tag}
                          </span>
                        );
                      }
                    });
                  })()}
                  {/* {item.tags
                    .splice(item.tags.length - 1, 0, "และ")
                    .map((tags, index) => {
                      return <span key={index}>{tags}</span>;
                    })} */}
                </p>
                <br />
                <div className="Sub-Photo-Container">
                  {item.photos.slice(1).map((photo, index) => {
                    return (
                      <img className="Sub-Photo" key={index} src={photo} />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
