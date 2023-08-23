import { Link } from "react-router-dom";
import "./RequestItem.scss"


const RequestItem = () => {
    return (
        <article className="kpi-requests">
          <div>
            <Link className="kpi-requests__link">
              <div className="kpi-requests__title">
                <h3 className="kpi-requests__request">
                  Sanitation Delay Impacting Production Start
                </h3>
                <div className="kpi-requests__subtitle">
                  <p className="kpi-requests__date">01/01/2001</p>
                  <p className="kpi-requests__rpn">RPN 50</p>
                  <p className="kpi-requests__status"> closed</p>
                </div>
              </div>
            </Link>
          </div>
        </article>
    );
};

export default RequestItem;