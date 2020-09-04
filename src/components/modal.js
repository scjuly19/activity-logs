import React from "react";
import "../App.css";
import moment from "moment";

const Modal = (props) => {
  const { activityData, onClose, showCalendar } = props;

  return (
    <div className="main">
      <div className="modal">
        <h1 className="heading">Date</h1>
        <h1 className="heading">Start</h1>
        <h1 className="heading">End</h1>
        {activityData.length > 0 ? (
          activityData.map((item, index) => {
            return (
              <>
                <h1 className="sub-heading">
                  {moment(item.start_time, "YYYY-MM-DDTHH:mm:ssZ").format(
                    "MMM Do YYYY"
                  )}
                </h1>
                <h1 className="sub-heading">
                  {moment(item.start_time).format("LT")}
                </h1>
                <h1 className="sub-heading">
                  {moment(item.end_time).format("LT")}
                </h1>
              </>
            );
          })
        ) : (
          <>
            <div></div>
            <h1>No data found</h1>
            <div></div>
          </>
        )}
      </div>
      <div className="row">
        <button onClick={onClose} className="btn">Close</button>
        <button onClick={showCalendar} className="btn">Calendar</button>
      </div>
    </div>
  );
};
export default Modal;
