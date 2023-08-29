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
      .get(`${SERVER_URL}/requests/${filterAssign}/${userId}`)
      .then((res) => {
        if (res)
        setRequests(res.data);
        setIsLoading(false);
        
      })
      .catch((err) => {
        if (err.response.status === 404){
          
        setError(err.response.message);
        console.log(err.response)

        }
        setIsLoading(false);
      });
    }

  }, [userId]);

  // const handleCreatedBy = () => {


  //     axios.get(`${SERVER_URL}/requests/createdby/${userId}`)
  //     .then((res) =>{
  //       setRequests(res.data);
  //     })
  //     .then()

    
  // }


    // .then(() => {
      //   axios.get(`${SERVER_URL}/requests/createdby/${userId}`);
      // })
      // .then((res) =>{
      //   setCreatedRequests("create",res.data);
      //  
      // })

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
      {requests.map((request) => {
        return (
          <RequestCard
            key={request.id}
            id={request.id}
            title={request.title}
            description={request.description}
            rpn={request.rpn}
            status={request.request_status}
            kpi={request.kpi_id}
            created_by={request.created_by}
            assigned_to={request.assigned_to}
            date = { new Date(request.created_at).toDateString()}
            // comments = {request.comments}
          />
        );
      })}
    </div>
  );
};

export default RequestList;
