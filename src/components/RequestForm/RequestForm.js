import "./RequestForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_API_URL;

const RequestForm = ({ userId, handleShowForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState(1);
  const [detection, setDetection] = useState(1);
  const [occurrence, setOccurrence] = useState(1);
  const [assignee, setAssignee] = useState("");
  const [users, setUsers] = useState("");
  const [kpis, setKpis] = useState("");
  const [kpi, setKpi] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users`)
      .then((res) => {
       
        setUsers(res.data);
      })
      .then(() => {
        axios.get(`${SERVER_URL}/kpis/${userId}`)
        .then((res) => {
          if (res.data.length === 0){
          setError("Please create KPIs before sending requests");
          }
          setKpis(res.data);
        });
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.message);
      });
  }, [userId]);


  //HANDLE CHANGE

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeAssignee = (e) => {
    setAssignee(e.target.value);
  };
  const handleChangeKpi = (e) => {
    setKpi(e.target.value);
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
  const isTitleValid = () => {
    if (title && title.length < 5) {
      return false;
    }
    return true;
  };
  const isDescriptionValid = () => {
    if (description && description.length < 15) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (
      !title ||
      !description ||
      !assignee ||
      !isTitleValid() ||
      !isDescriptionValid() 
    ) {
      return false;
    }
    return true;
  };

  

  const handleSubmit = () => {
    if (isFormValid()) {
      axios
        .post(`${SERVER_URL}/requests`, {
          title: title,
          description: description,
          rpn: detection * severity * occurrence,
          severity: severity,
          occurrence: occurrence,
          detection: detection,
          request_status: "Open",
          created_by: userId,
          assigned_to: assignee,
          kpi_id: kpi,
        })
        .then(() => {
          handleShowForm();
          setKpi("");
          setTitle("")
          
        })
        .catch( (err) => {
          console.log(err)
        })
    }
  };

  return (
    <div className="request">
      <div className="request__text-inputs">
      {error && <p className="request__error">{error}</p>}
        <label className="request__label">
          Request
          <input
            type="text"
            className={
              "request__input " +
              (isTitleValid() ? "" : "request__input--invalid")
            }
            name="title"
            value={title}
            onChange={handleChangeTitle}></input>
        </label>
        <label className="request__label">
          Description
          <textarea
            type="text"
            className={
              "request__input request__input--description " +
              (isDescriptionValid() ? "" : "request__input--invalid")
            }
            name="description"
            value={description}
            onChange={handleChangeDescription}></textarea>
        </label>
        <label className="request__label">
          Assignee
          <select
            type="text"
            className={"request__input "}
            name="assignee"
            onChange={handleChangeAssignee}>
            <option value="">Please select</option> 
            {users.length &&
              users.map((user) => {
                return (<option key={user.id} value={user.id}>
                    {user.username} |  {user.team} </option>

                );
              })}
          </select>
        </label>
        <label className="request__label">
          KPI
          <select
            type="text"
            className={"request__input "}
            name="kpi"
            onChange={handleChangeKpi}
           >
            <option value="">Please select</option> 
            {kpis.length &&
              kpis.map((kpi) => {
                return <option key={kpi.id} value={kpi.id}  > {kpi.title}  </option>;
              })}
          </select>
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
          RPN
          <span className="request__rpn-result">
            {detection * severity * occurrence}
          </span>
        </p>
        <div className="request__buttons">
          <div className="request__cancel " onClick={handleShowForm}>
            Cancel
          </div>
          <div
            className={
              "request__submition " +
              (isFormValid() ? "" : "request__submition--disabled")
            }
            onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
