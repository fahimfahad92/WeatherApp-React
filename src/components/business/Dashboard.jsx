import WeatherCard from "./WeatherCard";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { auth, logout } from "../../firebase";
import styles from "../../styles/Dashboard.module.css";

import FormComponent from "./FormComponent";

export default function Dashboard() {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log("Searched city " + cityName);
    setCities((prevCities) => {
      if (prevCities.includes(cityName.toLowerCase()) || cityName == "") {
        return [...prevCities];
      }

      return [...prevCities, cityName.toLowerCase()];
    });
    console.log(cities);
  }, [cityName]);

  const removeInvalidCity = (city) => {
    console.log("removing invalid entry " + city);
    const updatedCities = cities.filter(function (currentLocation) {
      return currentLocation !== city;
    });
    setCities(updatedCities);
  };

  return (
    <>
      <div className={styles.divColumn}>
        <div>
          <h1>
            <b>Welcome {auth.currentUser.displayName}</b>
          </h1>
          <div className={styles.leftButton}>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>

        <div className={styles.mainWrapper}>
          <FormComponent setCityName={setCityName} />
        </div>

        <div className={styles.mainWrapper}>
          {cities.map((city) =>
            city && city != "" ? (
              <div className={styles.fixedWidth} key={city}>
                <WeatherCard
                  location={city}
                  removeInvalidCity={removeInvalidCity}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
