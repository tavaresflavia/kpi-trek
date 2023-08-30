import './FormPage.scss'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = ({userId}) => {

  const navigate = useNavigate();

  useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    },[userId,navigate]

    )
 

  const kpis = ["Quality", "Operation"]
    return (
      <div className = "entry-container">
      <form className="entry">
        <h3 className="entry__title">KPI Entry</h3>
        <label className="entry__label">
          KPI
          <select
            className="entry__input "
            type="kpi"
            name="kpi"
            id="kpi"
          >
            {kpis.map(kpi => {
              return (<option name= {kpi}>{kpi}</option>)
            })}
          </select>
        </label>
        <label className="entry__label">
          Value
          <input
            className="entry__input "
            type="number"
            name="value"
            id="value"
          />
        </label>
        <label className="entry__label">
          Observation
          <textarea
            className="entry__input entry__input--textarea"
            name="value"
            id="value"
          />
        </label>
        <div className="entry__submittion-wrap">
          <button
                  // onClick={handleSubmit}
            href="/"
            className=
              "entry__submition " 
            >
            Submit
          </button>
          </div>
          </form> 

        
     </div>
         
    
    );
};

export default FormPage;