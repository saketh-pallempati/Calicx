import "./Skeleton.css";
export default function TableSkeleton() {
  return (
    <div className="something">
      <table>
        <thead className="tbl-header">
          <tr>
            <th>RegNo</th>
            <th>Name</th>
            <th className="table-big-row">Branch</th>
            <th>GPA</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody className="tbl-content">
          {Array(10)
            .fill()
            .map((_, index) => (
              <tr key={index}>
                <td>
                  <div class="skeleton "></div>
                </td>
                <td>
                  <div class="skeleton "></div>
                </td>
                <td>
                  <div class="skeleton "></div>
                </td>
                <td>
                  <div class="skeleton "></div>
                </td>
                <td>
                  <div class="skeleton "></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
