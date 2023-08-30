import RequestCard from "../RequestCard/RequestCard";
import "./RequestList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
const SERVER_URL = process.env.REACT_APP_API_URL;

const RequestList = ({ userId, checkedValues}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);

  const {filterStatus,  filterAssign, sort} = checkedValues
 
  

  useEffect(() => {
    if ( filterAssign){
    axios
      .get(`${SERVER_URL}/requests/${filterAssign}/${userId}?sort=${sort==="rpn" ? "rpn":"created_at"}`)
      .then((res) => {
        const newRequests = res.data.filter(request => (filterStatus.includes(request.request_status)));
        setRequests(newRequests);
        setIsLoading(false);
        
      })
      .catch((err) => {
        if (err.response.status === 404){
          
        setRequests([]);
        setError(err.response.message);
        console.log(err.response)

        }
        setIsLoading(false);
      });
    }

  }, [userId, filterAssign, sort,filterStatus]);

    if (isLoading) {
    return <p> Loading...</p>;
  }

  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }



  return (
    <div className="request-list">
      {requests.length ? requests.map((request) => {
        return (
          <RequestCard
            key={request.id}
            id={request.id}
            title={request.title}
            description={request.description}
            rpn={request.rpn}
            request_status={request.request_status}
            kpi={request.kpi_title}
            created_by={request.created_by}
            assigned_to={request.assigned_to}
            date = { new Date(request.created_at).toDateString()}
            // comments = {request.comments}
          /> 
        );
      }): <p>No requests found</p>}
    </div>
  );
};

export default RequestList;
