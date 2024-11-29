import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function WeatherCard({ location }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location || location == "") return;

    const url = import.meta.env.VITE_WEATHER_API_GET_DATA_URL + location;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    console.log("clicked");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null; // or initial state handling

  return (
    <Card className="w-[350px]">
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
            <Label htmlFor="name">{data.location.localtime}</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">
              {data.current.is_day ? " Day" : " Night"}
            </Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Temperature</Label>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">{data.current.temp_c}</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleClick}
          className="center"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}
