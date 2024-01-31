import "./RequestCard.scss";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import axios from "axios";
import expandIcon from "../../assets/icons/expandIcon.png";
import expandLessIcon from "../../assets/icons/expandLessIcon.png";
import Comment from "../Comment/Comment";
import errorIcon from "../../assets/icons/error.svg";


const SERVER_URL = process.env.REACT_APP_API_URL;

const RequestCard = ({
  userId,
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
  const [commentList, setCommentList] = useState([]);
  const [requestStatus, setRequestStatus] = useState(request_status);


  useEffect(() => {
    axios
      .get(`${SERVER_URL}/comments/${id}`)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id,comment]);

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

  const handleStatus = (e) => {
    axios
      .patch(`${SERVER_URL}/requests/${id}`, {
        request_status: e.target.value,
      })
      .then((res) => setRequestStatus(res.data.request_status))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentSubmit = () => { 
    axios
      .post(`${SERVER_URL}/comments`, {
        content: comment,
        created_by: userId,
        request_id: id,
      })
      .then((res) => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={`request-card  ${requestStatus==="Closed" ? "request-card--closed" : 301 > rpn ? "request-card--low-risk" : rpn >= 601 ? "request-card--high-risk" : ""}`}>
      <div className="request-card__header">
        <div className="request-card__title">
          <h3 className="request-card__request">{title}</h3>
          <div className="request-card__subtitle">
            <p className="request-card__date">{date}</p>
            <p className="request-card__rpn">
              RPN <span className="request-card__value"> {rpn} </span>
            </p>
            <p className="request-card__kpi">
              KPI <span className="request-card__value"> {kpi} </span>
            </p>
          </div>
        </div>
        <select
          className="request-card__status"
          id="status"
          name="status"
          value={requestStatus}
          onChange={handleStatus}>
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
        <p className="request-card__created-by">
          Created by <span className="request-card__value"> {created_by} </span>
        </p>

        <p className="request-card__assigned-to">
          Assigned to{" "}
          <span className="request-card__value"> {assigned_to}</span>
        </p>
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
            onClick={handleCommentSubmit}
            className={
              "update__submit " +
              (isSubmitValid() ? "" : "update__submit--disabled")
            }>
            Submit
          </button>
        </div>

        {comment && comment.length < 5 ? <div className="invalid"><img className="invalid__img" src={errorIcon} alt="error icon"></img><span className="invalid__text">Please enter at least 5 characters.</span></div> : ""}
        {!commentList.length && <div>Add the first comment.</div>}

        {!!commentList.length &&
          commentList.map((comment, i) => {
            return (
              <Comment
                key={i}
                name={comment.username}
                content={comment.content}
                timeStamp={moment(new Date(comment.created_at)).fromNow()}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RequestCard;
