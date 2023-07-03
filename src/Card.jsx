import { useNavigate } from 'react-router-dom';
import './Card.css'
import Axios from 'axios'
export default function Card({ id, RegNo, Name, setres }) {
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
    return (
        <div className="ag-courses_item">
            <div className="ag-courses-item_link" key={id} onClick={() => { handleChange(id) }} >
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">{Name}</div>
                <div className="ag-courses-item_date-box">
                    <span className="ag-courses-item_date"> {RegNo} </span>
                </div>
            </div>
        </div>
    )
}