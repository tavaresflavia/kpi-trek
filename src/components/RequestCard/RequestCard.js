import "./RequestCard.scss";
import { useState } from "react";
import expandIcon from "../../assets/icons/expandIcon.png";
import expandLessIcon from "../../assets/icons/expandLessIcon.png";
import Comment from "../Comment/Comment";

const RequestCard = ({
  key,
  id,
  title,
  description,
  rpn,
  status,
  createdBy,
  issueTo,
  date,
  comments,
  kpi,
}) => {
  const [expand, setExpand] = useState(false);
  const [comment, setComment] = useState("");

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

  return (
    <div
      className={`request-card  ${301 > rpn ? "request-card--low-risk" : ""}
    ${rpn >= 601 ? "request-card--high-risk" : ""}`}>
      <div className="request-card__header">
        <div className="request-card__title">
          <h3 className="request-card__request">{title}</h3>
          <div className="request-card__subtitle">
            <p className="request-card__date">{date}</p>
            <p className="request-card__rpn">RPN <span className ="request-card__value"> {rpn} </span></p>
            <p className="request-card__kpi"> KPI <span className ="request-card__value"> {kpi} </span></p>
          </div>
        </div>
        <select
          className="request-card__status"
          id="status"
          name="status"
          value={status}>
          <option className="request-card__status-option" value="open">
            Open
          </option>
          <option className="request-card__status-option" value="pending">
            Pending
          </option>
          <option className="request-card__status-option" value="resolved">
            Resolved
          </option>
          <option className="request-card__status-option" value="closed">
            Closed
          </option>
        </select>
      </div>
      <p className="request-card__description">{description}</p>
      <div className="request-card__assignment">
        <p className="request-card__created-by">Created by <span className ="request-card__value"> {createdBy} </span></p>

        <p className="request-card__assigned-to">Assigned to <span className ="request-card__value"> {issueTo}</span></p>
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

        {comments.map((el) => {
          return (
            <Comment
              name={el.userName}
              content={el.content}
              timeStamp={el.timeStamp}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RequestCard;
