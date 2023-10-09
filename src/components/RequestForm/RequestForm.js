import "./RequestForm.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import errorIcon from "../../assets/icons/error.svg";

const SERVER_URL = process.env.REACT_APP_API_URL;

const RequestForm = ({ userId, handleShowForm }) => {
  const defaultValues = {
    title: "",
    description: "",
    detection: 1,
    severity: 1,
    occurrence: 1,
    assignee: "",
    kpi: "",
  };

  const [error, setError] = useState("");
  const [users, setUsers] = useState("");
  const [kpis, setKpis] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [formValidity, setFormValidity] = useState(true);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .then(() => {
        axios.get(`${SERVER_URL}/kpis/${userId}`).then((res) => {
          if (res.data.length === 0) {
            setError("Please create KPIs before sending requests");
          }
          setKpis(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.message);
      });
  }, [userId]);

  //HANDLE CHANGE

  const handleChange = (e) => {
    const newValues = { ...values };
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
    setFormValidity(isFormValid());

  };

  const isTitleValid = () => {
    if (values.title && values.title.length < 5) {
      return false;
    }
    return true;
  };
  const isDescriptionValid = () => {
    if (values.description && values.description.length < 15) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (
      !values.title ||
      !values.description ||
      !values.assignee ||
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
          title: values.title,
          description: values.description,
          rpn: values.detection * values.severity * values.occurrence,
          severity: values.severity,
          occurrence: values.occurrence,
          detection: values.detection,
          request_status: "Open",
          created_by: userId,
          assigned_to: values.assignee,
          kpi_id: values.kpi,
        })
        .then(() => {
          handleShowForm();
          setValues(defaultValues);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="request">
      <div className="request__text-inputs">
        <label className="request__label">
          Request
          <input
            type="text"
            className={
              "request__input " +
              (isTitleValid() ? "" : "request__input--invalid")
            }
            name="title"
            value={values.title}
            onChange={handleChange}></input>
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
            value={values.description}
            onChange={handleChange}></textarea>
        </label>
        <label className="request__label">
          Assignee
          <select
            type="text"
            className={"request__input "}
            name="assignee"
            value={values.assignee}
            onChange={handleChange}>
            <option value="">Please select</option>
            {users.length &&
              users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.username} | {user.team}{" "}
                  </option>
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
            onChange={handleChange}
            value={values.kpi}>
            <option value="">Please select</option>
            {kpis.length &&
              kpis.map((kpi) => {
                return (
                  <option key={kpi.id} value={kpi.id}>
                    {" "}
                    {kpi.title}{" "}
                  </option>
                );
              })}
          </select>
        </label>
        
        {formValidity ? "":<div className="invalid"><img className="invalid__img" src={errorIcon} alt="error icon"></img><span className="invalid__text"> All fields are required.</span></div> }
         {!!error && <div className="invalid"><img className="invalid__img" src={errorIcon} alt="error icon"></img><span className="invalid__text">{error}</span></div>}
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
            value={values.severity}
            step="1"
            onChange={handleChange}></input>
          <p> {values.severity}</p>
        </div>
        <div className="request__rpn-wrapper">
          <label className="request__label-rpn">Occurrence</label>
          <input
            type="range"
            className="request__range"
            name="occurrence"
            min="1"
            max="10"
            value={values.occurrence}
            step="1"
            onChange={handleChange}></input>
          <p> {values.occurrence}</p>
        </div>

        <div className="request__rpn-wrapper">
          <label className="request__label-rpn">Detection</label>
          <input
            type="range"
            className="request__range"
            name="detection"
            min="1"
            max="10"
            value={values.detection}
            step="1"
            onChange={handleChange}></input>
          <p> {values.detection}</p>
        </div>

        <p className="request__rpn">
          RPN
          <span className="request__rpn-result">
            {values.detection * values.severity * values.occurrence}
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
