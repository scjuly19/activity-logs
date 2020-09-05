import React, { useEffect, useState } from "react";
import "../App.css";
import Modal from "./modal";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


const List = () => {
  const API_URL =
    "https://ff4e1821-eb00-4eeb-98c9-6fc4e3234140.mock.pstmn.io/activity";

  const [usersData, setUserData] = useState([]);
  const [isVisible, setModalVisible] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [activeDate, setDate] = useState();
  const [isCalendarVisible, toggleCalendar] = useState(false);

  /**@param none
   * @description Toggles the view of calendar
   */
  const showCalendar = () => {
    toggleCalendar(!isCalendarVisible);
  };

  /**@description Calls the function to get data from API */
  useEffect(() => {
    loadData();
  }, []);

  /**@description Fetch the data from API and set it to usersData */
  const loadData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUserData(data.members);
  };

  /**@param activityObject
   * @description Toggles the view of modal */
  const toggleModal = (item) => {
    setDate(new Date());
    setModalVisible(!isVisible);
    toggleCalendar(false);

    setActivityData(item.activity_periods);
  };

  /**@param DateSelected
   * @description Filter the data as per the date selected 
   */
  const onDateChange = (val) => {
    setDate(val);
    const newData = activityData.filter((item, index) => {
      if (
        moment(item.start_time).format("MM DD YYYY") ===
        moment(val).format("MM DD YYYY")
      ) {
        return item;
      }
      return;
    });
    setActivityData(newData);
    toggleCalendar(false);
  };

  
  return (
    <div className="App">
      {usersData.map((item, index) => {
        return (
          <button onClick={() => toggleModal(item)} className="rowBtn">{item.real_name}</button>
        );
      })}

      {isVisible && (
        <Modal
          onClose={toggleModal}
          activityData={activityData}
          showCalendar={showCalendar}
        />
      )}

      {isCalendarVisible && (
        <Calendar
          value={activeDate}
          onChange={onDateChange}
          maxDate={new Date()}
          className="calendar"
        
        />
      )}
    </div>
  );
};

export default List;
