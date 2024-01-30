import "./KpiForm.scss";
import { useState } from "react";
import axios from "axios";
import plusIcon from "../../assets/icons/plusIcon.png";
import errorIcon from "../../assets/icons/error.svg";

const SERVER_URL = process.env.REACT_APP_API_URL;

const KpiForm = ({userId,setReload,reload}) => {
  const defaultValues = {title:"",
    description:"",
    unit :""}
  const defaultLimits ={ target:"",
    upper_limit:"",
    lower_limit:""}
  const [values, setValues] = useState(defaultValues);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState("");
  const [limits,setLimits] = useState(defaultLimits);
  const [formValidity, setFormValidity] = useState(true);

//========== VALIDATION =============

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

//========== HANDLERS =============

  const handleFlip = () => {
    const changedFlip = !isFlipped;
    setIsFlipped(changedFlip);
  };

  const handleChange = (e) => {
    const newValues = { ...values };
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
    setFormValidity(isFormValid());
  };

  const handleLimitChange = (e) => {
    const newLimits = { ...limits };
    newLimits[e.target.name] = e.target.value;
    setLimits(newLimits);
  };

  const handleSubmit = () => {
    const currentLimits = {};
    for (const [key, value] of Object.entries(limits)) {
      if(value){
        currentLimits[key] = value;}
    }
    axios
      .post(`${SERVER_URL}/kpis`, { ...values, ...currentLimits, created_by: userId })
      .then(() => {
        handleFlip();
        setValues(defaultValues);
        setLimits(defaultLimits);
        setError("");
        const changeReload = !reload;
        setReload(changeReload);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div className="container">
      <div className={"card " + (isFlipped ? "card--flipped":"")}>
        <div className="card__front">
          <h3 className="card__title">Add new KPI</h3>
          <img src={plusIcon} alt="add KPI" onClick={handleFlip} />
        </div>
        <div className="kpi-form">
          <h3 className="kpi-form__title">Add new KPI</h3>
          <div className="kpi-form__row">
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
            </div>
          <div className="kpi-form__row">
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
              </div>
              <div className="kpi-form__row">
          <label className="kpi-form__label">
            Unit
          </label>
          <input
              className="kpi-form__input "
              type="text"
              name="unit"
              value={values.unit}
              onChange={handleChange}
            />
            </div>

            <div  className="kpi-form__limits">
            <div className="kpi-form__limit">

          <label className="kpi-form__label">
            Target
          </label>
          <input
              className="kpi-form__input kpi-form__input--small"
              type="number"
              name="target"
              value={limits.target}
              onChange={handleLimitChange}
            />
            </div>
            <div className="kpi-form__limit">
          <label className="kpi-form__label">
            Upper Limit
          </label>
          <input
              className="kpi-form__input kpi-form__input--small"
              type="number"
              name="upper_limit"
              value={limits.upper_limit}
              onChange={handleLimitChange}
            />
            </div>
           <div className="kpi-form__limit">
          <label className="kpi-form__label">
            Lower Limit
          </label>
          <input
              className="kpi-form__input kpi-form__input--small"
              type="number"
              name="lower_limit"
              value={limits.lower_limit}
              onChange={handleLimitChange}
            />
            </div>
            </div>
        {formValidity ? "":<div className="invalid"><img className="invalid__img" src={errorIcon} alt="error icon"></img><span className="invalid__text"> Name and Description are required.</span></div> }
         {!!error && <div className="invalid"><img className="invalid__img" src={errorIcon} alt="error icon"></img><span className="invalid__text">{error}</span></div>}

          <div className="kpi-form__buttons">
            <div className="kpi-form__cancel " onClick={handleFlip}>
              Cancel
            </div>
            <div
              onClick={handleSubmit}
              className={
                "kpi-form__submission " +
                (isFormValid() ? "" : "kpi-form__submission--disabled")
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
