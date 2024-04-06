import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card";
import Table from "./Table";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import AnimatedPage from "./AnimatedPage";
import { AnimatePresence } from "framer-motion";
import SegmentedControl from "./SegmentedControl";
import { Link } from "react-router-dom";
import TableSkeleton from "./TableSkeleton";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeOption, setActiveOption] = useState(1);
  const [Data, setData] = useState(null);
  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/initialData`)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
    Axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/sort`, {
      params: { sem: 0 },
    }).then((ans) => {
      setTableData(ans.data);
      setIsLoading(false);
    });
  }, []);
  const [tableData, setTableData] = useState();
  function handleClick(id) {
    getAllDetails(id);
  }
  async function getAllDetails(id) {
    Axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/sort`, {
      params: { sem: id },
    }).then((ans) => {
      setTableData(ans.data);
      setActive(Number(id));
    });
  }
  const [active, setActive] = useState(0);
  let items = [];
  for (let number = 0; number <= 5; number++) {
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

  const [state, setstate] = useState({
    query: "",
    list: [],
  });
  const handleChange = (e) => {
    const results = Data.data?.filter((post) => {
      if (e.target.value === "") return null;
      {
        if (activeOption === 1)
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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 568);
    });
  }, []);
  return (
    <>
      <p style={{ fontFamily: "Kaushan Script", fontSize: 60 }}>Calix_.</p>
      <SegmentedControl
        setActiveOption={setActiveOption}
        activeOption={activeOption}
      />
      <div className="search__container">
        <input
          className="search__input"
          placeholder={`Enter Your ${activeOption === 1 ? "Name" : "RegNo"}`}
          onChange={handleChange}
          value={state.query}
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
                {isLoading ? <TableSkeleton/> :<Table tableData={tableData} tableId={active} key={active} />  }
              </AnimatedPage>
            </AnimatePresence>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                paddingBottom: "0px",
              }}
            >
              <Pagination size={isMobile ? "sm" : "lg"}>{items}</Pagination>
            </div>

            <button className="button-branch" role="button">
              <Link to="/Branch" style={{ textDecoration: "none" }}>
                Branch wise details
              </Link>
            </button>
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
