import "./RequestPage.scss";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestList from "../../components/RequestList/RequestList.js";
import Filters from "../../components/Filters/Filters.js";
import RequestForm from "../../components/RequestForm/RequestForm.js";
import plusIcon from "../../assets/icons/plusIcon.png";



const RequestPage = ({userId}) => {

  const navigate = useNavigate();

  useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    },[userId]

    )
 
  const defaultValues = {sort:"date", filterStatus:["Open","Closed","Resolved","Pending"], filterAssign:"assignTo"}
  const [showForm, setShowForm] = useState(false);
  const [checkedValues, setCheckedValues]= useState(defaultValues);

  const hanldeshowForm = () => {
    const changeshowForm = !showForm;
    setShowForm(changeshowForm);
  };
  const handleSort = (e) =>{
    const newcheckedValues = { ...checkedValues};
    newcheckedValues.sort = e.target.value;
    setCheckedValues(newcheckedValues);
  } 
  const handleFilterStatus = (selectedSatus) =>{
    const newcheckedValues = { ...checkedValues};
    newcheckedValues.filterStatus = selectedSatus;
    setCheckedValues(newcheckedValues);
  } 
  const handleFilterAssign = (e) =>{
    const newcheckedValues = { ...checkedValues};
    newcheckedValues.filterAssign = e.target.value ;
    setCheckedValues(newcheckedValues);
  } 



  console.log(checkedValues)


  return (
    <main className="main">
      <div className="main-content">
        <div className= "main-content__side-bar">
          <Filters 
          handleSort = {handleSort}
          handleFilterStatus = {handleFilterStatus}
          handleFilterAssign = {handleFilterAssign}/>
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
          <RequestList userId={4} checkedValues={checkedValues}/>
        </div>
      </div>
    </main>
  );
};

export default RequestPage;
