
import { useState } from "react";
import "./Filters.scss";
import filterIcon from "../../assets/icons/filterIcon.png";
import arrowBackIcon from "../../assets/icons/arrowBack.png"



const Filters = () => {
    const [showFilters, setShowFilters] = useState(false);
    const handleFilterExpand = () => {
        const newShowFilters = !showFilters;
        setShowFilters(newShowFilters);
      };
    const statusList = ["Open","Pending","Resolved", "Closed" ]

    return (
        <>
        <div onClick={handleFilterExpand} className="tag-bar">
        <img className={"tag-bar__icon " + (showFilters ? "tag-bar__icon--arrow": "")} src={showFilters ? arrowBackIcon : filterIcon } alt="filter icon" />
      </div>
        <aside className={"filters" + (showFilters ? "" : "--hidden")}>
        <div className="filters__sorting">
          <h3 className="filters__title">Sort by</h3>
          
          <div className="filters__option">
            <input
              type="radio"
              id="rpn"
              value="rpn"
              name="sort"
            />
            <label className="filters__sort-lbl"> RPN</label>
          </div>

          <div className="filters__option">
            <input
              className="filters__sort-option"
              type="radio"
              id="date"
              value="date"
              name="sort"
            />
            <label className="filters__sort-lbl"> Date</label>
          </div>

        </div>

        <h3 className="filters__title"> Filter by</h3>
       
        <div className="filters__assignment">
          <div className="filters__option">
          <input
            id="assigned"
            type="radio"
            className="filters__assig-option"
            value="assignedTo"
            name="assignment"
          />
          <label for="assigned"> Assigned to me</label>
          </div>

          <div className="filters__option">

          <input
            id="created"
            type="radio"
            className="filters__assig-option"
            value="createdBy"
            name="assignment"
          />
          <label for="created"> Created by me</label>
          </div>
        </div>

        <div className="filters__status">
        {statusList.map((statusEl) => {
          return (
            <div className="filters__option">
            <input
              className="filters__input"
              type="checkbox"
              value= {statusEl}
              id= {statusEl}
            />
            <label className="filters_status-lbl" for={statusEl}> {statusEl}
            </label>

          </div>
          )
        })}
          
        </div>
      </aside>
      </>
    );
};

export default Filters;