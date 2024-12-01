import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";

const FormComponent = ({ setCityName }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setCityName(data.cityName);
    reset(); // Reset form after submission
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-4 border shadow">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Enter city name</Label>
            <Input
              id="name"
              {...register("cityName", { required: true })}
              placeholder="Enter city name"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormComponent;
