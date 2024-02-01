import "./RequestPage.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RequestList from "../../components/RequestList/RequestList.js";
import Filters from "../../components/Filters/Filters.js";
import RequestForm from "../../components/RequestForm/RequestForm.js";
import plusIcon from "../../assets/icons/plusIcon.png";

const RequestPage = ({ userId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  const { kpiId } = useParams();
  const defaultValues = {
    sort: "date",
    filterStatus: ["Open", "Closed", "Resolved", "Pending"],
    filterAssign: "",
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(!!kpiId);
  const [checkedValues, setCheckedValues] = useState(defaultValues);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleSearchTerm = (e) => {
    setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 1000);
  };

  const handleShowForm = () => {
    const changeshowForm = !showForm;
    setShowForm(changeshowForm);
  };

  //Handling sorting and filtering

  const handleSort = (e) => {
    const newCheckedValues = { ...checkedValues };
    newCheckedValues.sort = e.target.value;
    setCheckedValues(newCheckedValues);
  };

  const handleFilterStatus = (e) => {
    let newSelectedStatus = [];
    let newcheckedValues = { ...checkedValues };
    //Frist and second conditions uncheck a checked value
    if (
      selectedStatus.includes(e.target.value) &&
      selectedStatus.length === 1
    ) {
      newSelectedStatus = [...defaultValues.filterStatus];
      newcheckedValues.filterStatus = newSelectedStatus;
      setSelectedStatus([]);
    } else if (selectedStatus.includes(e.target.value)) {
      newSelectedStatus = [...selectedStatus];
      newSelectedStatus.splice(selectedStatus.indexOf(e.target.value), 1);
      newcheckedValues.filterStatus = newSelectedStatus;
      setSelectedStatus(newSelectedStatus);
      //Adds the value as a selected value
    } else {
      newSelectedStatus = [...selectedStatus, e.target.value];
      newcheckedValues.filterStatus = newSelectedStatus;
      setSelectedStatus(newSelectedStatus);
    }
    setCheckedValues(newcheckedValues);
  };

  const handleFilterAssign = (e) => {
    const newcheckedValues = { ...checkedValues };
    newcheckedValues.filterAssign = e.target.value;
    setCheckedValues(newcheckedValues);
  };

  return (
    <main className="main">
      <div className="main-content">
        <div className="main-content__side-bar">
          <Filters
            handleSort={handleSort}
            handleFilterStatus={handleFilterStatus}
            handleFilterAssign={handleFilterAssign}
          />
          <img
            onClick={handleShowForm}
            className="main-content__plus"
            src={plusIcon}
            alt="add request"
          />
        </div>
        <section className="main-content__cards">
          <div className="main-content__search-wrap">
            <input
              className="main-content__search-input"
              onChange={handleSearchTerm}></input>
          </div>
          <div
            className={"main-content__form-wrapper" + (showForm || "--hidden")}>
            <RequestForm userId={userId} handleShowForm={handleShowForm} />
          </div>
          <RequestList
            showForm={showForm}
            userId={userId}
            checkedValues={checkedValues}
            searchTerm={searchTerm}
          />
          {/* only passed showForm to force re-render  */}
        </section>
      </div>
    </main>
  );
};

export default RequestPage;
