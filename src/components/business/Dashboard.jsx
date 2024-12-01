import WeatherCard from "./WeatherCard";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { auth, logout } from "../../firebase";
import styles from "../../styles/Dashboard.module.css";

import FormComponent from "./FormComponent";

export default function Dashboard() {
  const [cityName, setCityName] = useState("");
  const [cities, setCities] = useState(
    localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : []
  );

  useEffect(() => {
    setCities((prevCities) => {
      if (prevCities.includes(cityName.toLowerCase()) || cityName == "") {
        return [...prevCities];
      }

      return [...prevCities, cityName.toLowerCase()];
    });
  }, [cityName]);

  const removeCity = (city) => {
    const updatedCities = cities.filter(function (currentLocation) {
      return currentLocation !== city;
    });
    setCities(updatedCities);
  };

  const addToWatchList = (city) => {
    const watchList = localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : [];
    if (watchList.includes(city)) {
      return;
    }
    localStorage.setItem("watchList", JSON.stringify([...watchList, city]));
  };

  const removefromWatchList = (city) => {
    const watchList = localStorage.getItem("watchList")
      ? JSON.parse(localStorage.getItem("watchList"))
      : [];
    const updatedWatchList = watchList.filter(function (currentLocation) {
      return currentLocation !== city;
    });
    localStorage.setItem("watchList", JSON.stringify([...updatedWatchList]));

    removeCity(city);
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
                  removeCity={removeCity}
                  addToWatchList={addToWatchList}
                  removefromWatchList={removefromWatchList}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
