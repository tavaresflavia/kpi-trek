import "./KpiCard.scss";
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
import { useEffect, useState } from "react";
import axios from "axios";
import RequestItemList from "../RequestItemList/RequestItemList";

const SERVER_URL = process.env.REACT_APP_API_URL;

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const KpiCard = ({ id, title, unit, target, lower_limit, upper_limit }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/kpis/entries/${id}`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (entries.length === 0) {
    return (
      <article className="kpi-card">
        <h3 className="kpi-card__title">{`${title} (${unit})`} </h3>
        <div className="kpi-card__no-entries">No Entries</div>
      </article>
    );
  }

  const filteredLabels = entries.map((entry) => {
    return new Date(entry["created_at"]).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    });
  });
  const filteredData = entries.map((entry) => entry.value);
  const upperLimit = filteredData.map(() => upper_limit);
  const targetLimit = filteredData.map(() => target);
  const lowerLimit = filteredData.map(() => lower_limit);
  const observations = entries.map((entry, i) => {
    return [entry.observation, filteredLabels[i], entry.username];
  });

  const data = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Entries",
        data: filteredData,
        borderColor: "#7FD3E3",
        backgroundColor: "#7FD3E340",
        pointStyle: "circle",
        pointRadius: 5,
      },
      {
        label: "Upper Limit",
        data: upperLimit,
        borderColor: "#f4976cb5",
        backgroundColor: "#f4976c40",
        pointStyle: false,
        borderDash: [10, 10],
      },
      {
        label: "Target",
        data: targetLimit,
        borderColor: "#9eebd7",
        backgroundColor: "#9eebd736",
        pointStyle: false,
        borderDash: [10, 10],
      },
      {
        label: "Lower Limit",
        data: lowerLimit,
        borderColor: "#f4976cb5",
        backgroundColor: "#f4976c40",
        pointStyle: false,
        borderDash: [10, 10],
      },
    ],
  };

  const options = {
    legend: {
      position: "bottom",
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          footer: function (context) {
            if (context[0].datasetIndex === 0) {
              let obs;
              observations.forEach((el) => {
                if (context[0].label === el[1]) {
                  obs = [el[2], el[0]];
                }
              });
              return obs;
            }
          },
        },
      },
    },
  };

  return (
    <article className="kpi-card">
      <div className="kpi__card-inner">
        <h3 className="kpi-card__title">{`${title} (${unit})`} </h3>
        <div className="kpi-card__graph">
          <Line data={data} options={options}></Line>
        </div>
        <RequestItemList kpiId={id} />
      </div>

      <div className="kpi__card-back"></div>
    </article>
  );
};

export default KpiCard;
