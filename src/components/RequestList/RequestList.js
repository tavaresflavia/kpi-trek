import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequestCard from "../RequestCard/RequestCard";
import "./RequestList.scss";

const SERVER_URL = process.env.REACT_APP_API_URL;

const RequestList = ({ userId, checkedValues, showForm, searchTerm }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);

  const { filterStatus, filterAssign, sort } = checkedValues;
  const { requestId } = useParams();

  useEffect(() => {
    if (requestId) {
      axios
      .get(`${SERVER_URL}/requests/single/${requestId}`)
      .then((res) => {
        const newRequests = res.data.filter((request) =>
          filterStatus.includes(request.request_status)
        );
        setRequests(newRequests);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setRequests([]);
          setError(err.response.message);
        }
        setIsLoading(false);
      });
  } else{
      axios
        .get(
          `${SERVER_URL}/requests${filterAssign ? "/assignment":""}/${userId}?sort=${
            sort === "rpn" ? "rpn" : "created_at"
          }${filterAssign ? "&assign=" + filterAssign: ""}`
        )
        .then((res) => {
          const newRequests = res.data.filter((request) =>
            filterStatus.includes(request.request_status)
          );
          setRequests(newRequests);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setRequests([]);
            setError(err.response.message);
          }
          setIsLoading(false);
        });
    }}
  , [userId, requestId, filterAssign, sort, filterStatus, showForm]);

  if (isLoading) {
    return <p> Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const regex = new RegExp(`(${searchTerm.replace(" ", "\\s")})`, 'gi');
  console.log(regex)
  return (
    <section className="request-list">
      {requests.length ? (
        requests.map((request) => {
          const {id,
            title,
            description,
            rpn,
            request_status,
            kpi_title,
            created_by,
            assigned_to,
            created_at} = request

          if (!searchTerm || (description.match(regex) || title.match(regex))){
          return (
            <RequestCard
              userId={userId}
              key={id}
              id={id}
              title={title}
              description={description}
              rpn={rpn}
              request_status={request_status}
              kpi={kpi_title}
              created_by={created_by}
              assigned_to={assigned_to}
              date={new Date(created_at).toDateString()}
              regex={searchTerm? regex: ""}
            />
          );}
          return ""
        })
      ) : (
        <p>No requests found</p>
      )}
    </section>
  );
};

export default RequestList;
