import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import styles from "../../styles/WeatherDetail.module.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LineChartComponent from "./LineChartComponent";

export default function WeatherDetail({
  isOpen,
  togglePopup,
  location,
  localDate,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!location || location == "") return;

    var date = new Date(localDate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    const queryDate = year + "-" + month + "-" + day;
    console.log(queryDate);

    const url =
      import.meta.env.VITE_WEATHER_API_BASE_URL +
      import.meta.env.VITE_WEATHER_API_GET_DETAIL_PATH +
      import.meta.env.VITE_WEATHER_API_API_KEY +
      "&q=" +
      location +
      "&dt=" +
      queryDate;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);

        let chartInfo = [];

        result.forecast.forecastday[0].hour.forEach((hourData) => {
          const hourInfo = { hour: hourData.time, temp: hourData.temp_c };
          chartInfo.push(hourInfo);
        });

        console.log("Chart data ready for " + location);
        setChartData(chartInfo);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert(`Error: ${error.message}`);
    setError(null);
    return null;
  }
  if (!data) return null; // or initial state handling

  return (
    <div>
      {isOpen && (
        <div className={styles.popup}>
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>{data.location.name}</CardTitle>
              <CardDescription>{data.location.country}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 items-center">
                  <Label htmlFor="name">
                    Local Time {data.location.localtime}
                  </Label>
                </div>
                <div className="flex flex-col space-y-1.5">
                  Max Temperature:
                  <Label htmlFor="name">
                    {data.forecast.forecastday[0].day.maxtemp_c}°C{" "}
                  </Label>
                  <Label htmlFor="name"></Label>
                  Min Temperature:
                  <Label htmlFor="name">
                    {data.forecast.forecastday[0].day.mintemp_c}°C
                  </Label>
                  <Label htmlFor="name">
                    <img
                      className="center"
                      src={data.forecast.forecastday[0].day.condition.icon}
                      alt={data.forecast.forecastday[0].day.condition.text}
                    />
                  </Label>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">
                    Sunrise: {data.forecast.forecastday[0].astro.sunrise}
                  </Label>
                  <Label htmlFor="framework">
                    Sunsunset: {data.forecast.forecastday[0].astro.sunset}
                  </Label>
                  <Label htmlFor="framework">
                    Moonrise: {data.forecast.forecastday[0].astro.moonrise}
                  </Label>
                  <Label htmlFor="framework">
                    Moonset: {data.forecast.forecastday[0].astro.moonset}
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardContent>
              <LineChartComponent
                date={data.location.localtime}
                chartData={chartData}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button
                variant="destructive"
                size="sm"
                onClick={togglePopup}
                className="center"
              >
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
