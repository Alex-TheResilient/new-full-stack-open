import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;
const baseUrlWeather = "https://api.openweathermap.org/data/2.5/weather?";

const getWeather = (name) => {
  const request = axios.get(`${baseUrlWeather}q=${name}&appid=${api_key}`);
  return request.then((response) => response.data);
};

export default { getWeather };
