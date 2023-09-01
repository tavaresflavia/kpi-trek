import "./FormPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_API_URL;

const FormPage = ({ userId }) => {
  const defaultValues = {
    value: "",
    kpi_id: "",
    created_by: userId,
    observation: "",
  };

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [kpis, setKpis] = useState([]);
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }

    axios
      .get(`${SERVER_URL}/kpis/${userId}`)
      .then((res) => {
        if (res.data.length === 0) {
          setError("Please create KPIs before sending requests");
        }
        setKpis(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, navigate]);
  const handleChange = (e) => {
    const newValues = { ...values };
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
  };
  const handleSubmit = () => {
    axios
      .post(`${SERVER_URL}/kpis/entries`, values)
      .then((_res) => {
        setValues(defaultValues);
        navigate('/KPI');
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
  };

  return (
    <div className="entry-container">
      <form className="entry">
        <h3 className="entry__title">KPI Entry</h3>
        <label className="entry__label">
          KPI
          <select className="entry__input " type="kpi" name="kpi_id" id="kpi" onChange={handleChange}>
          <option value="">Please select</option>
            {kpis.map((kpi) => {
              return <option key={kpi.id} value={kpi.id}>{kpi.title}</option>;
            })}
          </select>
        </label>
        <label className="entry__label">
          Value
          <input
            className="entry__input "
            type="number"
            name="value"
            value={values.value}
            onChange={handleChange}
          />
        </label>
        <label className="entry__label">
          Observation
          <textarea
            className="entry__input entry__input--textarea"
            name="observation"
            value={values.observation}
            onChange={handleChange}
          />
        </label>
        {!!error && <p className="entry__error">{error}</p>}
        <div className="entry__submittion-wrap">
          <div onClick={handleSubmit} href="/" className="entry__submition ">
            Submit
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
