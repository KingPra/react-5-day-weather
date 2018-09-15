import React, { Component } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
//import GetWeather from "./components/GetWeather";

const API_KEY = "a53130cd66281fe281431da75fa09d0e";

class App extends Component {
  state = {
    temperature: 0,
    description: undefined,
    city: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=imperial&cnt=40`
    );
    const data = await api_call.json();
    console.log(data);
    this.setState({
      temperature: data.list[0].main.temp,
      description: data.list[0].weather[0].description,
      city: data.city.name,
      error: ""
    });
  };
  render() {
    return (
      <div className="App">
        <h1>5 day forecast</h1>
        <Form getWeather={this.getWeather} />
        <Weather day="Monday" temp={85} conditions="chance of meatballs" />
        <Weather day="TUESDAY" temp={89} conditions="chance of meatballs" />
        <Weather
          temp={this.state.temperature}
          conditions={this.state.description}
          city={this.state.city}
        />
      </div>
    );
  }
}

export default App;
