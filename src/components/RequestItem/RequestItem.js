import { Link } from "react-router-dom";
import "./RequestItem.scss"


const RequestItem = ({id,rpn, created_at, request_status, title}) => {
    return (
        <article className="kpi-requests">
          <div>
            <Link to={`/request/${id}`} className="kpi-requests__link">
              <div className="kpi-requests__title">
                <h3 className="kpi-requests__request">
                  {title}
                </h3>
                <div className="kpi-requests__subtitle">
                  <p className="kpi-requests__date">{new Date(created_at).toDateString()}</p>
                  <p className="kpi-requests__rpn">RPN  {rpn}</p>
                  <p className="kpi-requests__status"> {request_status}</p>
                </div>
              </div>
            </Link>
          </div>
        </article>
    );
};

export default RequestItem;