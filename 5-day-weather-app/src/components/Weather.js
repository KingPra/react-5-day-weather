import React from "react";

const Weather = props => {
  return (
    <div className="daily">
      <h2>{props.day}</h2>
      <p>Temps: {Math.round(props.temp)}</p>
      <p>{props.conditions}</p>
      <p>Location: {props.city}</p>
    </div>
  );
};
export default Weather;
