import axios from "axios";
import React, { useEffect, useState } from "react";
import "./KpiList.scss";
import KpiCard from "../KpiCard/KpiCard";
import KpiForm from "../KpiForm/KpiForm";

const SERVER_URL = process.env.REACT_APP_API_URL;

const KpiList = ({ userId }) => {
  const [kpis, setKpis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/kpis/${userId}`)
      .then((res) => {
        setKpis(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [userId, reload]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return null;
  }

  return (
    <div className="kpi-list">
      {kpis.map((kpi) => {
        return (
          <KpiCard
            key={kpi.id}
            id={kpi.id}
            title={kpi.title}
            unit={kpi.unit}
            target={kpi.target}
            lower_limit={kpi.lower_limit}
            upper_limit={kpi.upper_limit}
          />
        );
      })}

      <KpiForm userId={userId} setReload={setReload} reload={reload} />
    </div>
  );
};

export default KpiList;
