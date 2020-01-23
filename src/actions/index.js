import transformForecast from "../components/services/transformForecast";
import getUrlWeatherForecast from "../components/services/getUrlWeatherForecast";
import getUrlWeatherByCity from "../components/services/getUrlWeatherByCity";
import transformWeather from "../components/services/transformWeather";
export const SET_CITY = "SET_CITY";
export const SET_FORECAST_DATA = "SET_FORECAST_DATA";
export const GET_WEATHER_CITY = "GET_WEATHER_CITY";
export const SET_WEATHER_CITY = "SET_WEATHER_CITY";

const setCity = payload => ({ type: SET_CITY, payload });

const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload });

const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload });

const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload });

export const setSelectedCity = payload => {
  return (dispatch, getState) => {
    const api_forecast = getUrlWeatherForecast({ city: payload });

    // activar en el estado un indicador de busqueda de datos
    dispatch(setCity(payload));

    const state = getState();

    const date =
      state.cities[payload] && state.cities[payload].forecastDataDate;

    const now = new Date();

    if (date && now - date < 1 * 60 * 1000) {
      return;
    }
    return fetch(api_forecast)
      .then(data => data.json())
      .then(weather_data => {
        const forecastData = transformForecast(weather_data);
        // modificar el estado con el resultado de la promise (fetch)
        dispatch(setForecastData({ city: payload, forecastData }));
      });
  };
};

export const setWeather = payload => {
  return dispatch => {
    payload.forEach(city => {
      dispatch(getWeatherCity(city));
      const api_weather = getUrlWeatherByCity(city);

      fetch(api_weather)
        .then(resolve => {
          return resolve.json();
        })
        .then(data => {
          const weather = transformWeather(data);

          dispatch(setWeatherCity({ city, weather }));
        });
    });
  };
};
