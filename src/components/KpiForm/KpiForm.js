import "./KpiForm.scss";
import { useState } from "react";
import axios from "axios";
import plusIcon from "../../assets/icons/plusIcon.png";

const SERVER_URL = process.env.REACT_APP_API_URL;

const KpiForm = ({userId}) => {
  const defaultValues = {title:"",
    description:"",
    unit :"",
    target:"",
    upper_limit:"",
    lower_limit:""}
  const [values, setValues] = useState(defaultValues);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState("");

  const handleFlip = () => {
    const changedFlip = !isFlipped;
    setIsFlipped(changedFlip);
  };

  const handleChange = (e) => {
    const newValues = { ...values };
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
  };

  const isNameValid = () => {
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
      !isNameValid() ||
      !isDescriptionValid()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    console.log(values)
    axios
      .post(`${SERVER_URL}/kpis`, { ...values, created_by: userId })
      .then((res) => {
        console.log(res);
        handleFlip();
        setValues(defaultValues);
        setError("");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="container">
      <div className={"card " + (isFlipped && "card--flipped")}>
        <div className="card__front">
          <h3 className="card__title">Add new KPI</h3>
          <img src={plusIcon} alt="add KPI" onClick={handleFlip} />
        </div>
        <div className="kpi-form">
          <h3 className="kpi-form__title">Add new KPI</h3>
          <label className="kpi-form__label">
            Name
          </label>
          <input
              className={
                "kpi-form__input " +
                (isNameValid() ? "" : "kpi-form__input--invalid")
              }
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
          <label className="kpi-form__label">
            Description
          </label>
          <textarea
              className={
                "kpi-form__input kpi-form__input--description " +
                (isDescriptionValid() ? "" : "kpi-form__input--invalid")
              }
              name="description"
              value={values.description}
              id="description"
              onChange={handleChange}></textarea>
          <label className="kpi-form__label">
            Unit
          </label>
          <input
              className="kpi-form__input  kpi-form__input--small"
              type="text"
              name="unit"
              value={values.unit}
              onChange={handleChange}
            />

          <label className="kpi-form__label">
            Target
          </label>
          <input
              className="kpi-form__input kpi-form__input--small"
              type="number"
              name="target"
              value={values.target}
              onChange={handleChange}
            />
          <label className="kpi-form__label">
            Upper Limit
          </label>
          <input
              className="kpi-form__input kpi-form__input--small"
              type="number"
              name="upper_limit"
              value={values.upper_limit}
              onChange={handleChange}
            />
          <label className="kpi-form__label">
            Lower Limit
          </label>
          <input
              className="kpi-form__input kpi-form__input--small"
              type="number"
              name="lower_limit"
              value={values.lower_limit}
              onChange={handleChange}
            />
         {error && <p className="kpi-form__error">{error}</p>}

          <div className="kpi-form__buttons">
            <div className="kpi-form__cancel " onClick={handleFlip}>
              Cancel
            </div>
            <div
              onClick={handleSubmit}
              className={
                "kpi-form__submition " +
                (isFormValid() ? "" : "kpi-form__submition--disabled")
              }>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiForm;
