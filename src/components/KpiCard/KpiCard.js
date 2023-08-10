import "./KpiCard.scss";
import {Link} from 'react-router-dom';
import history from '../../data/history.json';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const KpiCard = () => {

  const filteredLabels = history.filter((el) => el.kpiId === 1).map((el) => el.timeStamp)
  const filteredData = history.filter((el) => el.kpiId === 1).map((el) => el.value)

  const data = {
    labels: filteredLabels,
    datasets: [{label:"this KPI",
    data:filteredData}]

  }

  const options ={
    plugins:{
      legend:true},
      // scales{
      //   y:m
      // }
    }


  console.log(filteredLabels );
  return (
    <article className="kpi-card">
        <div className= "kpi__card-inner">
      <div className="kpi-card__graph">
        <Line
          data ={data}
          >
        
        </Line>
      </div>
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
      </div>

      <div className= "kpi__card-back">

        
      </div>
      
    
    </article>
  );
};

export default KpiCard;
