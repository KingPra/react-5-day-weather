import React, { Component } from "react";
import Weather from "./Weather";
import Form from "./Form";

const API_KEY = "a53130cd66281fe281431da75fa09d0e";

export default class GetWeather extends Component {
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=imperial&cnt=40`
    );
    const data = await api_call.json();
    console.log("city:", city);
    console.log(data);
  };
  render() {
    return (
      <div className="App">
        <Form />
        <Weather day="Monday" temp={85} conditions="chance of meatballs" />
        <Weather day="TUESDAY" temp={89} conditions="chance of meatballs" />
        <Weather
          temp={this.props.temperature}
          conditions={this.props.description}
          city={this.props.city}
        />
      </div>
    );
  }
}
