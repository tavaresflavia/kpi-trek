import RequestForm from "../../components/RequestForm/RequestForm.js";
import RequestList from "../../components/RequestList/RequestList.js";
import "./RequestPage.scss";

const RequestPage = () => {
  return (
    <main>
      <aside className="filters">
        <div className="filters__sorting">
          <p className="filters__btn">Sort by KPI</p>
          <p className="filters__btn">Sort by Date</p>
        </div>

        {/* <h3 className="filters__title"> Filters </h3> */}

        <div className="filters__assignment">

        <p className="filters__btn">Assigned to me</p>
        <p className="filters__btn">Created by me</p>
        </div>

        <div className="filters__status">
        
        <p className="filters__btn">Open</p>
        <p className="filters__btn">Pending</p>
        <p className="filters__btn">Closed</p>
        <p className="filters__btn">Resolved</p>
        </div>

      </aside>
      <div className="main-content">
        <RequestList />
        <RequestForm />
      </div>
    </main>
  );
};

export default RequestPage;
