
import RequestCard from "../RequestCard/RequestCard";
import requests from '../../data/requests.json'

const RequestList = () => {
    return (
        <div>
            {requests.map((request) =>{
                return <RequestCard
                key = {request.requestId}
                id = {request.requestId}
                title = {request.title}
                description = {request.description}
                rpn = {request.rpn}
                status = {request.status}
                kpi = {request.kpiId}
                createdBy = {request.createdBy}
                issueTo = {request.issueTo}
                date = { new Date(request.date).toDateString()}
                comments = {request.comments} 
                />

            })}
            
        </div>
    );
};

export default RequestList;