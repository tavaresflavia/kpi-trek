import React, { useEffect, useState} from "react";
import axios from "axios";
import "./RequestItemList.scss"
import RequestItem from "../RequestItem/RequestItem";

const SERVER_URL = process.env.REACT_APP_API_URL;


const RequestItemList = ({ kpiId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/requests/kpi/${kpiId}?limit=3`)
      .then((res) => {
        console.log(res.data)
        setRequests(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setRequests([]);
          setError(err.response.message);
        }
        setIsLoading(false);
      });
  }, [kpiId]);

  if (isLoading) {
    return <p> Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="item-list">
      {requests.map((request) => {
        
      return <RequestItem 
      key={request.id}
      rpn = {request.rpn}
      created_at = {request.created_at}
      request_status = {request.request_status}
      title = {request.title}
      
      />


      }
        
      )}
    </div>
  );
};

export default RequestItemList;
