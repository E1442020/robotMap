import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJBumFjSoH-7NL9545OiwwS8iF-Mb_LW0", // Replace with your Google Maps API key
  });

  const [currentLocation, setCurrentLocation] = useState<any>(null);
  // console.log(currentLocation);

  useEffect(() => {
    let watchId: any;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const onLoad = React.useCallback(function callback() {
    // Do something with the map object if needed
  }, []);

  const onUnmount = React.useCallback(function callback() {
    // Clean up any resources related to the map if needed
  }, []);

  return isLoaded && currentLocation ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>{currentLocation && <Marker position={currentLocation} />}</>
      </GoogleMap>
      <div>
        <h2>Current Location:</h2>
        <p>Latitude: {currentLocation.lat}</p>
        <p>Longitude: {currentLocation.lng}</p>
      </div>
    </>
  ) : (
    <div>Map loading error</div>
  );
}

export default React.memo(MyComponent);
