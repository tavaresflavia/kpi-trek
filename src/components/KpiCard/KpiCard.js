import "./KpiCard.scss";
import history from "../../data/history.json";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import RequestItem from "../RequestItem/RequestItem";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const KpiCard = () => {
  const filteredLabels = history
    .filter((el) => el["kpi_id"] === 1)
    .map((el) =>{
      return new Date(el["created_at"]).toLocaleDateString("en-us", {
        month: "long",
        day: "numeric",
      })});


  const filteredData = history
    .filter((el) => el["kpi_id"] === 1)
    .map((el) => el.value);
  const upperLimit = filteredData.map(() => 98);
  const target = filteredData.map(() => 95);
  const lowerLimit = filteredData.map(() => 90);


  const data = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Values",
        data: filteredData,
        borderColor: "#7FD3E3",
        backgroundColor: "#7FD3E340",
        // borderColor: "#A9A9A9",
        // backgroundColor: "#A9A9A940",
        pointStyle: "circle",
        pointRadius: 5,
      },
      {
        label: "Upper Limit",
        data: upperLimit,
        borderColor: "#f4976cb5",
        backgroundColor: "#f4976c40",
        pointStyle: false,
        borderDash: [10, 10]
      },
      {
        label: "Target",
        data: target,
        borderColor: "#9eebd7",
        backgroundColor: "#9eebd736",
        pointStyle: false,
        borderDash: [10, 10]
      },
      {
        label: "Lower Limit",
        data: lowerLimit,
        borderColor: "#f4976cb5",
        backgroundColor: "#f4976c40",
        pointStyle: false,
        borderDash: [10, 10]
      },
    ],
  };

  const options = {
    legend:{
      position: "bottom"
    }
  
  };


  return (
    <article className="kpi-card">
      <div className="kpi__card-inner">
        <h3 className="kpi-card__title">KPI name </h3>
        <div className="kpi-card__graph">
          <Line   data={data} options ={options}></Line>
        </div>
        <RequestItem/>
        <RequestItem/>
        <RequestItem/>

        
      </div>

      <div className="kpi__card-back"></div>
    </article>
  );
};

export default KpiCard;
