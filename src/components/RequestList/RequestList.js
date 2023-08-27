
import RequestCard from "../RequestCard/RequestCard";
import './RequestList.scss'
import axios from "axios";
import { useEffect, useState } from "react";
const SERVER_URL  = process.env.REACT_APP_API_URL;

const RequestList = ({userId}) => {
    const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [requests, setRequests] = useState([]);
  console.log(userId)

    useEffect(()=> {
        axios
        .get(`${SERVER_URL}/requests/assignedto/${4}`)
        .then((res) => {
            setRequests(res.data);
            setIsLoading(false);
        })
        .catch((err)=> {
        console.log(err);
        setHasError(true);
        })
    },[userId])

    if (isLoading) {
        return <p> Loading...</p>;
      }
    
      if (hasError) {
        return (
          <p>Oops! We're experiencing some technical difficulties and unable to
            retrieve the data at the moment.</p>
        );
      }
    
      console.log("req", requests)
   
    return (
        <div className = "request-list">
            {requests.map((request) =>{
              console.log(request.id)
                return <RequestCard
                key = {request.id}
                id = {request.id}
                title = {request.title}
                description = {request.description}
                rpn = {request.rpn}
                status = {request.request_status}
                kpi = {request.kpi_id}
                created_by = {request.created_by}
                assigned_to = {request.assigned_to}
                // date = { new Date(request.created_at).toDateString()}
                // comments = {request.comments} 
                />

            })}
            
        </div>
    );
};

export default RequestList;