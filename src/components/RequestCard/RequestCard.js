import "./RequestCard.scss";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import axios from "axios";
import expandIcon from "../../assets/icons/expandIcon.png";
import expandLessIcon from "../../assets/icons/expandLessIcon.png";
import Comment from "../Comment/Comment";

const SERVER_URL = process.env.REACT_APP_API_URL;


const RequestCard = ({
  key,
  id,
  title,
  description,
  rpn,
  request_status,
  created_by,
  assigned_to,
  date,
  kpi,
}) => {
  const [expand, setExpand] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList ] = useState([]);
  const [requestStatus, setRequestStatus] = useState(request_status);
  
// Function call

  useEffect(()=> {
    axios
    .get(`${SERVER_URL}/comments/${id}`)
    .then(res => {
      console.log(res.data)
      setCommentList(res.data)
    }
    )
    .catch(err =>{
      console.log(err)
    })
     

  },[id])

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleExpand = () => {
    const newExpandState = !expand;
    setExpand(newExpandState);
  };
  const isCommentValid = () => {
    if (comment && comment.length < 5) {
      return false;
    }
    return true;
  };

  const isSubmitValid = () => {
    if (!comment || !isCommentValid()) {
      return false;
    }
    return true;
  };

  const handleStatus = (e) =>{
    setRequestStatus(e.target.value)
  }

  return (
    <div
      className={`request-card  ${301 > rpn ? "request-card--low-risk" : ""}
    ${rpn >= 601 ? "request-card--high-risk" : ""}`}>
      <div className="request-card__header">
        <div className="request-card__title">
          <h3 className="request-card__request">{title}</h3>
          <div className="request-card__subtitle">
            <p className="request-card__date" >{date}</p>
            <p className="request-card__rpn">RPN <span className ="request-card__value"> {rpn} </span></p>
            <p className="request-card__kpi"> KPI <span className ="request-card__value"> {kpi} </span></p>
          </div>
        </div>
        <select
          className="request-card__status"
          id="status"
          name="status"
          value={requestStatus} onChange={handleStatus}>
          <option className="request-card__status-option" value="Open">
            Open
          </option>
          <option className="request-card__status-option" value="Pending">
            Pending
          </option>
          <option className="request-card__status-option" value="Resolved">
            Resolved
          </option>
          <option className="request-card__status-option" value="Closed">
            Closed
          </option>
        </select>
      </div>
      <p className="request-card__description">{description}</p>
      <div className="request-card__assignment">
        <p className="request-card__created-by">Created by <span className ="request-card__value"> {created_by} </span></p>

        <p className="request-card__assigned-to">Assigned to <span className ="request-card__value"> {assigned_to}</span></p>
        <img
          className="request-card__expand-icon"
          src={expand ? expandLessIcon : expandIcon}
          alt="expand icon"
          onClick={handleExpand}></img>
      </div>

      <div
        className={
          "request-card__comments " +
          (expand ? "" : "request-card__comments--hidden")
        }>
        <div className="update">
          <textarea
            type="text"
            className={
              "update__input " +
              (isCommentValid() ? "" : "update__input--invalid")
            }
            name="comment"
            value={comment}
            onChange={handleChangeComment}></textarea>

          <button
            className={
              "update__submit " +
              (isSubmitValid() ? "" : "update__submit--disabled")
            }>
            Submit
          </button>
        </div>

        {!commentList.length && <div>No comment found</div>}

        {!!commentList.length && commentList.map((comment) => {
          return (
            <Comment
              name={comment.username}
              content={comment.content}
              timeStamp={ moment(new Date(comment.created_at)).fromNow()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RequestCard;
