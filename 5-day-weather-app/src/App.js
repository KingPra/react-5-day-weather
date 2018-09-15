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

    const dataList = data.list;
    const weatherArray = [];
    const startTimeStamp = new Date(dataList[0].dt * 1000);
    const hour = startTimeStamp.getHours();
    //const day = startTimeStamp.getUTCDay();

    for (let i = 0; i < dataList.length; i++) {
      let timeStamp = new Date(dataList[i].dt * 1000);
      if (timeStamp.getHours() === hour) {
        weatherArray.push(dataList[i]);
      }
    }
    console.log("timestamp:", startTimeStamp);
    console.log("hour:", hour);
    console.log("weather array:", weatherArray);
    //need to parse through weather array and only use 24hr blocks of data;

    // console.log(hour);
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
