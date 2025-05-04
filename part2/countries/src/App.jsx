import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weathers";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const countryCapital = country.capital[0];

  useEffect(() => {
    weatherService.getWeather(countryCapital).then((data) => {
      // console.log('Weather data:', data)
      setWeather(data);
    });
  }, [countryCapital]);

  // console.log('Icon', weather?.weather[0].icon)
  // console.log('Weather:', countryCapital)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="177" />
      {weather && (
        <div>
          <h3>Weather in {countryCapital}</h3>
          <div>Temperature: {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const toggleCountry = (country) => {
    if (selectedCountry?.name.common === country.name.common) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  };

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => toggleCountry(country)}>
            {selectedCountry?.name.common === country.name.common
              ? "hide"
              : "show"}
          </button>
          {selectedCountry?.name.common === country.name.common && (
            <CountryDetails country={selectedCountry} />
          )}
        </div>
      ))}
    </div>
  );
};

const Country = ({ countries, value }) => {
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      {countriesToShow.length === 1 ? (
        <CountryDetails country={countriesToShow[0]} />
      ) : (
        <CountryList countries={countriesToShow} />
      )}
    </div>
  );
};

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((data) => {
      // console.log('Data received:', data)
      setCountries(data);
    });
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value)
    setValue(event.target.value);
  };

  return (
    <div>
      find countries: <input value={value} onChange={handleChange} />
      {/* <pre>
        {JSON.stringify(countries, null, 2)}
      </pre> */}
      <Country countries={countries} value={value} />
    </div>
  );
}

export default App;
