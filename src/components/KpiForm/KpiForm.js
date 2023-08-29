import "./KpiForm.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import plusIcon from "../../assets/icons/plusIcon.png"

const KpiForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const changedFlip = !isFlipped;
    setIsFlipped(changedFlip);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const isNameValid = () => {
    if (name && name.length < 5) {
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
    if (!name || !description || !isNameValid() || !isDescriptionValid()) {
      return false;
    }
    return true;
  };

  return (
    <div className="container">
    <div className={"card " +(isFlipped && "card--flipped")} >
      <div className="card__front">
        <h3 className="card__title">Add new KPI</h3>
        <img src={plusIcon}   alt="add KPI"  onClick={handleFlip}/>

      </div>
      <div className="kpi-form">
        <h3 className = "kpi-form__title">Add new KPI</h3>
        <label className="kpi-form__label">
          Name
          <input
            className={
              "kpi-form__input " +
              (isNameValid() ? "" : "kpi-form__input--invalid")
            }
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </label>
        <label className="kpi-form__label">
          Description
          <textarea
            className={
              "kpi-form__input kpi-form__input--description " +
              (isDescriptionValid() ? "" : "kpi-form__input--invalid")
            }
            name="description"
            value={description}
            id="description"
            onChange={handleChangeDescription}></textarea>
        </label>

        <label className="kpi-form__label">
          Target
          <input
            className="kpi-form__input"
            type="number"
            name="target"
            id="target"
          />
        </label>
        <label className="kpi-form__label">
          Upper Limit
          <input
            className="kpi-form__input"
            type="number"
            name="target"
            id="target"
          />
        </label>
        <label className="kpi-form__label">
          Lower Limit
          <input
            className="kpi-form__input"
            type="number"
            name="target"
            id="target"
          />
        </label>

        <div className="kpi-form__buttons">
            <div className="kpi-form__cancel " onClick= {handleFlip}>Cancel</div>
          <Link
            to="/KPI"
            className={
              "kpi-form__submition " +
              (isFormValid() ? "" : "kpi-form__submition--disabled")
            }>Submit
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default KpiForm;
