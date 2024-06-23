import "./Marks.css";
import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import AnimatedPage from "./AnimatedPage";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";

function Marks() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [active, setActive] = useState(1);
  const [views, setViews] = useState(0);

  useEffect(() => {
    fetchMarks();
  }, []);

  useEffect(() => {
    if (data) {
      handleViews(data.RegNo);
    }
  }, [data]);

  const fetchMarks = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API_ENDPOINT}/` + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };  

  const handleViews = async (test_id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_ENDPOINT}/api/getViews/` + test_id
      );
      setViews(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleClick = (id) => setActive(Number(id));

  let items = [];
  for (let number = 1; number <= 4; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={(e) => handleClick(e.target.id)}
        id={number}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (!data) return <Loader />;

  return (
    <>
      <div className="nft">
        <div className="main">
          <h2>{data.Name}</h2>
          <h4>{data.RegNo}</h4>
          <p className="description">{data.Branch}</p>
        </div>
        <div className="flex-marks">
          <div className="SGPA">
            <strong>SGPA</strong>
            <p>
              <strong>1 :</strong> {data.gpa[1].toFixed(4)}
            </p>
            <p>
              <strong>2 :</strong> {data.gpa[2].toFixed(4)}
            </p>
            <p>
              <strong>3 :</strong> {data.gpa[3].toFixed(4)}
            </p>
            <p>
              <strong>4 :</strong> {data.gpa[4].toFixed(4)}
            </p>
            <p>
              <strong>5 :</strong> {data.gpa[5].toFixed(4)}
            </p>
            <p>
              <strong>6 :</strong> {data.gpa[6].toFixed(4)}
            </p>
          </div>
          <div className="tokenInfo">
            <strong>CGPA</strong>
            <p>{data.gpa.cgpa.toFixed(4)} </p>
            <strong>Rank </strong>
            <p>{data.rank} </p>
            <strong>Views </strong>
            <p>{views}</p>
          </div>
        </div>
      </div>

      <div className="marks--container">
        <AnimatePresence mode="wait">
          <AnimatedPage key={active}>
            <div className="animate">
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th className="table-big-row">Description</th>
                    <th>CIA</th>
                    <th>Credit</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.subject.map((val, key) => {
                    if (val.Sem == active)
                      return (
                        <tr key={key}>
                          <td>{val.Code}</td>
                          <td className="table-max-width">{val.Description}</td>
                          <td>{val.CIA}</td>
                          <td>{val.Credit}</td>
                          <td>{val.Grade}</td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            </div>
          </AnimatedPage>
        </AnimatePresence>

        <div className="pg">
          <Pagination size="lg">{items}</Pagination>
        </div>
      </div>
      <Link
        to="/"
        style={{
          fontFamily: "Kaushan Script",
          fontSize: 60,
          textDecoration: "none",
        }}
      >
        Calix_.
      </Link>
    </>
  );
}

export default Marks;
