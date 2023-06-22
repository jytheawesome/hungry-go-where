import React, {useState, useEffect} from "react";

const UserLocation = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation not supported by your browswer.");
    }
  }, []);

  function successCallback(position: Position) {
    const {latitude, longitude} = position.coords;
    setLocation({latitude, longitude});
  }

  function errorCallback(error: PositionError) {
    console.log("Error getting location");
  }

  return (
    <h2>
      You are located in {location.latitude} and {location.longitude}
    </h2>
  );
};

export default UserLocation;
