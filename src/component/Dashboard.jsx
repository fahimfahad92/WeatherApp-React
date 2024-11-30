import WeatherCard from "./WeatherCard";

import FormComponent from "./FormComponent";
import { useState, useEffect } from "react";
import "../index.css";

export default function Dashboard({ handleLogout }) {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log("Searched city " + cityName);
    setCities((prevCities) => {
      return [...prevCities, cityName];
    });
    console.log(cities);
  }, [cityName]);

  return (
    <>
      <div id="div-column">
        <div>
          <h1>
            <b>Welcome to Weather APP</b>
          </h1>
          <div id="left-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div id="main-wrapper">
          <FormComponent setCityName={setCityName} />
        </div>

        <div id="main-wrapper">
          {cities.map((city) =>
            city && city != "" ? (
              <div id="fixed-width">
                <WeatherCard location={city} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
