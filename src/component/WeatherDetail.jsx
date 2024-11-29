import { useState } from "react";

export default function WeatherDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Open Popup</button>
      {isOpen && (
        <div className="popup">
          <button onClick={togglePopup}>Close</button>
          <p>Weather detail will be displayed here</p>
        </div>
      )}
    </div>
  );
}
