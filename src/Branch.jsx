import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import Axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Loader from "./Loader";

export default function Branch() {
  useEffect(() => {
    handleSelect(branchList[0]);
  }, []);
  const [tableData, setTableData] = useState([]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const [active, setActive] = useState(1);
  let items = [];
  const handleClick = (number) => {
    console.log(number);
    setActive(number);
  };
  items.push(
    <Pagination.Prev
      key="prev"
      onClick={() => setActive((old) => Math.max(old - 1, 1))}
      disabled={active === 1}
    />
  );

  let start = Math.max(1, active - 2);
  let end = Math.min(totalPages, active + 2);

  if (end - start + 1 < 5 && totalPages >= 5) {
    if (start === 1) {
      end = start + 4;
    } else if (end === totalPages) {
      start = end - 4;
    }
  }
  for (let number = start; number <= end; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handleClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  items.push(
    <Pagination.Next
      key="next"
      onClick={() => setActive((old) => Math.min(old + 1, totalPages))}
      disabled={active === totalPages}
    />
  );
  const indexOfLastItem = active * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const branchList = [
    "Computer Science & Engineering (IoT & Automation)",
    "Computer Science & Engineering",
    "Computer Science & Business Systems",
    "Computer Science & Engineering (Artificial Intelligence & Data Science)",
    "Computer Science & Engineering (Cyber Security & Blockchain Technology)",
    "Information & Communication Technology",
    "Information Technology",
  ];
  const [branch, setBranch] = useState("");

  const handleSelect = async (selectedBranch) => {
    setActive(1);
    setBranch(selectedBranch);
    try {
      const response = await Axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/branch`, {
        params: { branch: selectedBranch },
      });
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  if (tableData.length === 0) return <Loader />;

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          paddingBottom: 40,
        }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          title={
            branch.includes("(") ? branch.split("(")[1].split(")")[0] : branch
          }
          onSelect={handleSelect}
        >
          {branchList.map((item, index) => (
            <Dropdown.Item key={index} eventKey={item}>
              {item.includes("(") ? item.split("(")[1].split(")")[0] : item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <table>
        <thead className="tbl-header">
          <tr>
            <th>Index</th>
            <th>RegNo</th>
            <th>Name</th>
            <th>GPA</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody className="tbl-content">
          {currentItems.map((val, index) => {
            const overallIndex = (active - 1) * rowsPerPage + index + 1;

            return (
              <tr key={val.SNo}>
                <td>{overallIndex}</td>
                <td>{val.RegNo}</td>
                <td>
                  <Link to={`/marks/${val.SNo}`} className="link-primary">
                    {val.Name}
                  </Link>
                </td>
                <td>{val.gpa["cgpa"].toFixed(4)}</td>
                <td>{val.rank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <Pagination>{items}</Pagination>
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
