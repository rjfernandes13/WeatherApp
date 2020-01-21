import React, { Component } from "react";
import PropTypes from "prop-types";
import ForecastItem from "./ForecastItem.js";
import getUrlWeatherForecast from "./services/getUrlWeatherForecast";
import transformForecast from "./services/transformForecast";
import "./styles.css";

class ForecastExtended extends Component {
  constructor() {
    super();
    this.state = {
      forecastData: null
    };
  }

  componentDidMount() {
    this.updateCity(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city) {
      this.setState({ forecastData: null });
      this.updateCity(nextProps.city);
    }
  }

  updateCity = city => {
    const api_forecast = getUrlWeatherForecast({ city: city });

    fetch(api_forecast)
      .then(resolve => {
        return resolve.json();
      })
      .then(weather_data => {
        const forecastData = transformForecast(weather_data);
        this.setState({ forecastData });
      });
  };

  renderForecastItemDays(forecastData) {
    return forecastData.map(forecast => (
      <ForecastItem
        key={`${forecast.weekDay}${forecast.hour}`}
        weekDay={forecast.weekDay}
        hour={forecast.hour}
        data={forecast.data}
      ></ForecastItem>
    ));
  }

  renderProgress = () => {
    return <h3>"Cargando pronostico extendido..."</h3>;
  };

  render() {
    const { city } = this.props;
    const { forecastData } = this.state;

    return (
      <div>
        <h2 className="forecast-title"> Pronostico Extendido para {city} </h2>
        {forecastData
          ? this.renderForecastItemDays(forecastData)
          : this.renderProgress()}
      </div>
    );
  }
}

ForecastExtended.protoTypes = {
  city: PropTypes.string.isRequired
};

export default ForecastExtended;
