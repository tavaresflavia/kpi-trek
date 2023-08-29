import "./RequestForm.scss";
import { useState } from "react";
import {Link} from 'react-router-dom';

const RequestForm = () => {
  const [severity, setSeverity] = useState(1);
  const [detection, setDetection] = useState(1);
  const [occurrence, setOccurrence] = useState(1);
  const [request, setRequest] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");



  const handleChangeRequest= (e) => {
    setRequest(e.target.value);
  };

  const handleChangeDescription= (e) => {
    setDescription(e.target.value);
  };

  const handleChangeAssignee= (e) => {
    setAssignee(e.target.value);
  };

  const handleChangeSeverity = (e) => {
    setSeverity(e.target.value);
  };

  const handleChangeDetection = (e) => {
    setDetection(e.target.value);
  };

  const handleChangeOccurrence = (e) => {
    setOccurrence(e.target.value);
  };

  const isRequestValid = () => {
    if (request && request.length < 5 ){
      return false;
    }
    return true;
  };

  const isDescriptionValid = () => {
    if (description && description.length < 15 ){
      return false;
    }
    return true;
  };

  const isAssigneeValid = () => {
    if (assignee && assignee.length < 3 ){
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (!request || !description || !assignee || !isRequestValid() || !isDescriptionValid() || !isAssigneeValid()){
      return false;
    }
    return true;
  };

  return (
    <div className="request">
      <div className="request__text-inputs">
        <label className="request__label">
          Request
          <input type="text" className={"request__input " + (isRequestValid() ? "":"request__input--invalid")} name="request" value= 
          {request}  onChange={handleChangeRequest}></input>
        </label>
        <label className="request__label">
          Description
          <textarea
            type="text"
            className= {"request__input request__input--description " + (isDescriptionValid() ? "":"request__input--invalid")}
            name="description"
            value= {description} onChange={handleChangeDescription}
            ></textarea>
        </label>
        <label className="request__label">
          Assignee
          <input type="text" className={"request__input " + (isAssigneeValid() ? "":"request__input--invalid") } name="assignee" value = {assignee} onChange={handleChangeAssignee}></input>
        </label>
      </div>
      <div className="request__rpn-inputs">
        <div className="request__rpn-wrapper">
          <label className="request__label-rpn">Severity</label>
          <input
            type="range"
            className="request__range"
            name="severity"
            min="1"
            max="10"
            value={severity}
            step="1"
            onChange={handleChangeSeverity}></input>
          <p> {severity}</p>
        </div>
        <div className="request__rpn-wrapper">
          <label className="request__label-rpn">Occurrence</label>
          <input
            type="range"
            className="request__range"
            name="severity"
            min="1"
            max="10"
            value={occurrence}
            step="1"
            onChange={handleChangeOccurrence}></input>
          <p> {occurrence}</p>
        </div>

        <div className="request__rpn-wrapper">
          <label className="request__label-rpn">Detection</label>
          <input
            type="range"
            className="request__range"
            name="severity"
            min="1"
            max="10"
            value={detection}
            step="1"
            onChange={handleChangeDetection}></input>
          <p> {detection}</p>
        </div>

        <p className="request__rpn">
          RPN <span className="request__rpn-result">{detection * severity * occurrence}</span>
        </p>
        <div className = "request__buttons">
        <Link to = "/Request" className="request__cancel "><div >Cancel</div></Link>
        <Link to = "/Request" className= {"request__submition " + (isFormValid() ? "": "request__submition--disabled") }><div >Submit</div></Link>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
