import { Link } from 'react-router-dom';
import './Card.css'
export default function Card({ id, RegNo, Name }) {
    return (
        <div className="ag-courses_item">
            <Link className="ag-courses-item_link" style={{textDecoration : "none"}} key={id} to={`/marks/${id}`}>
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">{Name}</div>
                <div className="ag-courses-item_date-box">
                    <span className="ag-courses-item_date"> {RegNo} </span>
                </div>
            </Link>
        </div>
    )
}

