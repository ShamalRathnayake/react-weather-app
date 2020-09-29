import React from "react";

function WorldTime({ weather }) {
  const dateBuilder = () => {
    let d = new Date();
    let offset = d.getTimezoneOffset() * 60;
    let seconds = d / 1000;
    let utcTime = seconds + offset;

    let nd = new Date(0);
    nd.setSeconds(utcTime + weather.data.timezone);

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[nd.getDay()];
    let date = nd.getDate();
    let month = months[nd.getMonth()];
    let year = nd.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getTime = () => {
    let d = new Date();
    let offset = d.getTimezoneOffset() * 60;
    let seconds = d / 1000;
    let utcTime = seconds + offset;

    let nd = new Date(0);
    nd.setSeconds(utcTime + weather.data.timezone);

    let hour = nd.getHours();
    let minute = nd.getMinutes();
    let ampm;
    if (hour > 12) {
      hour = hour - 12;
      ampm = "PM";
    } else if (hour == 12) {
      ampm = "PM";
    } else {
      ampm = "AM";
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }

    return `${hour}:${minute} ${ampm}`;

    /* return d.toLocaleTimeString() */
  };

  return (
    <div className="world-time">
      <p className="time">{getTime()}</p>
      <p className="date">{dateBuilder()}</p>
    </div>
  );
}

export default WorldTime;
