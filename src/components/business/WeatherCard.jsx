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

export default function WeatherCard({
  location,
  removeCity,
  addToWatchList,
  removefromWatchList,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [localDate, setLocalDate] = useState("");

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location || location == "") return;

    fetchData();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const refreshData = () => {
    if (!location || location == "") return;
    fetchData();
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert(`Error: ${error.message}`);
    setError(null);
    removeCity(location);

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
            variant="outline"
            size="sm"
            onClick={refreshData}
            className="center"
          >
            Refresh
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={togglePopup}
            className="center"
          >
            Details
          </Button>
        </CardFooter>
        <CardFooter>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removefromWatchList(location)}
            className="center"
          >
            Remove
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => addToWatchList(location)}
            className="center"
          >
            Add To Watch List
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
