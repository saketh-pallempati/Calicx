import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import AnimatedPage from "./AnimatedPage";
import { AnimatePresence } from "framer-motion";
export default function Table({ tableData, tableId, setres }) {
  const navigate = useNavigate();
  function handleChange(id) {
    getAllDetails(id);
  }
  async function getAllDetails(sno) {
    Axios.get('https://calicx-api.vercel.app/' + sno).then((ans) => {
      setres(ans.data)
    }).then(() => {
      navigate('/marks')
    })
  }

  if (tableId === 0) {
    tableId = "cgpa"
  }
  if (tableData) {
    return (
      <AnimatePresence mode="wait" >
        <AnimatedPage>
          <div className="something">
            <table >
              <thead className="tbl-header">
                <tr>
                  <th>RegNo</th>
                  <th>Name</th>
                  <th className='table-big-row' >Branch</th>
                  <th>GPA</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody className="tbl-content">
                {tableData.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.RegNo}</td>
                      <td key={val.SNo} onClick={() => { handleChange(val.SNo) }}><a className="link-primary">{val.Name}</a></td>
                      <td>{val.Branch}</td>
                      <td>{val.gpa[tableId.toString()].toFixed(4)}</td>
                      <td>{val.rank}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </AnimatedPage>
      </AnimatePresence>
    );
  }
}