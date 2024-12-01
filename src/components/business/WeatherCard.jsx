import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import WeatherDetail from "./WeatherDetail";

export default function WeatherCard({ location, removeInvalidCity }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [localDate, setLocalDate] = useState("");

  useEffect(() => {
    if (!location || location == "") return;

    const url =
      import.meta.env.VITE_WEATHER_API_BASE_URL +
      import.meta.env.VITE_WEATHER_API_GET_CURRENT_DATA_PATH +
      import.meta.env.VITE_WEATHER_API_API_KEY +
      "&q=" +
      location;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setLocalDate(result.location.localtime);
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert(`Error: ${error.message}`);
    setError(null);
    removeInvalidCity(location);

    return null;
  }
  if (!data) return null; // or initial state handling

  return (
    <>
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>{data.location.name}</CardTitle>
          <CardDescription>{data.location.country}</CardDescription>
          <CardDescription>
            <img
              className="center"
              src={data.current.condition.icon}
              alt={data.current.condition.text}
            />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 items-center">
              Last updated: <Label>{data.location.localtime}</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">
                {data.current.is_day ? " Day" : " Night"}
              </Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              Temperature
              <Label htmlFor="framework">{data.current.temp_c}°C</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={togglePopup}
            className="center"
          >
            Details
          </Button>
        </CardFooter>
      </Card>

      <WeatherDetail
        isOpen={isOpen}
        togglePopup={togglePopup}
        location={location}
        localDate={localDate}
      />
    </>
  );
}
