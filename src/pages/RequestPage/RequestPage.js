import "./RequestPage.scss";
import RequestList from "../../components/RequestList/RequestList.js";
import Filters from "../../components/Filters/Filters.js";
import RequestForm from "../../components/RequestForm/RequestForm.js";
import plusIcon from "../../assets/icons/plusIcon.png";
import { useState } from "react";

const RequestPage = ({userId}) => {
  const [showForm, setShowForm] = useState(false);

  const hanldeshowForm = () => {
    const changeshowForm = !showForm;
    setShowForm(changeshowForm);
  };

  return (
    <main className="main">
      <div className="main-content">
        <div className= "main-content__side-bar">
          <Filters />
          <img
            onClick={hanldeshowForm}
            className="main-content__plus"
            src={plusIcon}
            alt="add request"
          />
        </div>
        <div className= "main-content__cards">
          <div className= {"main-content__form-wrapper" + (showForm || "--hidden") }>
            <RequestForm />
          </div>
          <RequestList userId={userId}/>
        </div>
      </div>
    </main>
  );
};

export default RequestPage;
