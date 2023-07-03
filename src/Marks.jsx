import "./Marks.css";
import { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import.meta.env.VITE_SOME_KEY

function Marks({ data }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  let items = [];
  for (let number = 1; number <= 4; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={(e) => handleClick(e.target.id)}
        id={number}>
        {number}
      </Pagination.Item>,
    );
  }
  function handleClick(id) {
    setActive(Number(id));
  }



  const [views, setViews] = useState(0);

  const handleViews = async (test_id) => {
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/counter?id=id${test_id}&hit=true`, {
        headers: { 'X-Api-Key': VITE_SOME_KEY }
      });
      setViews(response.data.value);
    } catch (error) {
      console.error('Error: ', error.response.data);
    }
  };

  if (data) {
    data = data.value;
    useEffect(() => {
      handleViews(data.RegNo);
    }, []);
    return (
      <>
        <div className="nft">
          <div className="main">
            <h2>{data.Name}</h2>
            <h4>{data.RegNo}</h4>
            <p className="description" >{data.Branch}</p>
          </div>
          <div className="SGPA">
            <p>
              <strong>SGPA</strong>
            </p>
            <p><strong>1 :</strong> {data.gpa[1].toFixed(4)}</p>
            <p><strong>2 :</strong> {data.gpa[2].toFixed(4)}</p>
            <p><strong>3 :</strong> {data.gpa[3].toFixed(4)}</p>
            <p><strong>4 :</strong> {data.gpa[4].toFixed(4)}</p>
          </div>
          <div className="tokenInfo">
            <div className="price">
              <strong>CGPA</strong>
              <p>{data.gpa.cgpa.toFixed(4)} </p>
            </div>
            <div className="duration">
              <strong>Rank </strong>
              <p>{data.rank} </p>
              <strong>Views </strong>
              <p>{views}</p>
            </div>
          </div>
        </div>
        <div className="marks--container">
          <table>
            <thead >
              <tr>
                <th>Code</th>
                <th className='table-big-row' >Description</th>
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
          <div className="pg">
            <Pagination size="lg">{items}</Pagination>
          </div>
        </div>

      </>
    );
  }
  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);
}
export default Marks;
