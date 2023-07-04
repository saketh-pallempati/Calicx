import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Table from "./Table";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import AnimatedPage from "./AnimatedPage";
import { AnimatePresence } from "framer-motion";
function App() {
  const [Data, setData] = useState(null);
  useEffect(() => {
    Axios.get("https://calicxapi.vercel.app/initialData")
      .then((res) => setData(res))
      .catch((err) => console.log(err));
    Axios.get("https://calicxapi.vercel.app/sort", { params: { sem: 0 } }).then(
      (ans) => {
        setTableData(ans.data);
      }
    );
  }, []);
  const [tableData, setTableData] = useState();
  function handleClick(id) {
    getAllDetails(id);
  }
  async function getAllDetails(id) {
    Axios.get("https://calicxapi.vercel.app/sort", {
      params: { sem: id },
    }).then((ans) => {
      setTableData(ans.data);
      setActive(Number(id));
    });
  }
  const [active, setActive] = useState(0);
  let items = [];
  for (let number = 0; number <= 4; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(e) => handleClick(e.target.id)}
        id={number}
      >
        {number === 0 ? "CGPA" : number}
      </Pagination.Item>
    );
  }
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [state, setstate] = useState({
    query: "",
    list: [],
  });
  const handleChange = (e) => {
    const results = Data.data?.filter((post) => {
      if (e.target.value === "") return null;
      {
        if (toggle)
          return post.Name.toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        else {
          return post.RegNo.toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      }
    });
    setstate({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <>
      <p style={{ fontFamily: "Kaushan Script", fontSize: 60 }}>Calicx_.</p>
      <div className="container--tabs">
        <div className="bloc-tabs">
          <button
            className={toggle === true ? "tabs active-tabs" : "tabs"}
            onClick={() => handleToggle()}
          >
            Name
          </button>
          <button
            className={toggle === false ? "tabs active-tabs" : "tabs"}
            onClick={() => handleToggle()}
          >
            RegNo
          </button>
        </div>
      </div>
      <div className="search__container">
        <input
          className="search__input"
          placeholder="Search"
          onChange={handleChange}
          value={state.query}
          type="search"
        />
      </div>

      <div className="App">
        {state.query === "" ? (
          <>
            <div className="Header--container">
              <h1 style={{ fontFamily: "Kenia" }}>Top 10</h1>
              {active === 0 ? (
                <p className="google-font">
                  based on <strong>cgpa</strong>
                </p>
              ) : (
                <p className="google-font">
                  based on <strong>sem-{active} </strong>gpa
                </p>
              )}
            </div>
            <AnimatePresence mode="wait">
              <AnimatedPage key={active}>
                <Table tableData={tableData} tableId={active} key={active} />
              </AnimatedPage>
            </AnimatePresence>
            <div
              style={{
                width: 1000,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                padding: 40,
              }}
            >
              <Pagination size="lg">{items}</Pagination>
            </div>
            <footer>
              <h5>
                The source code of the project is hosted on GitHub @
                <a href="https://github.com/saketh-pallempati">
                  Saketh Pallempati
                </a>{" "}
                <p style={{ fontSize: 16 }}>(PS: Dark mode, anyone?)</p>
              </h5>
              <p>
                {" "}
                A machine learning model that can solve captchas to automate the
                login process has been developed by{" "}
                <a href="https://github.com/Marxalpha/Captcha_Solver">
                  KNM Sai Krishna
                </a>
              </p>
            </footer>
          </>
        ) : (
          <div className="ag-format-container">
            <div className="ag-courses_box">
              {state.list.map((post) => {
                return (
                  <Card
                    key={post.SNo}
                    id={post.SNo}
                    RegNo={post.RegNo}
                    Name={post.Name}
                  ></Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
