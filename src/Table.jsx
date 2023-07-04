import { Link } from 'react-router-dom'
export default function Table({ tableData, tableId }) {
  if (tableId === 0) {
    tableId = "cgpa"
  }
  if (tableData) {
    return (
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
                  <td><Link to={`/marks/${val.SNo}`} className="link-primary">{val.Name}</Link></td>
                  <td>{val.Branch}</td>
                  <td>{val.gpa[tableId.toString()].toFixed(4)}</td>
                  <td>{val.rank}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}