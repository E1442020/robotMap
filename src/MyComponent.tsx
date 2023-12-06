import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "700px",
  height: "500px",
};

// const center = {
//     lat :30.040904864466672, lng:31.209323080460027
// };

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJBumFjSoH-7NL9545OiwwS8iF-Mb_LW0",
  });
  const [currentLocation, setCurrentLocation] = useState(null);

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (isLoaded && currentLocation && map) {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);
    }
  }, [isLoaded, currentLocation, map]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  //   const onLoad = React.useCallback(function callback(map) {
  //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //     const bounds = new window.google.maps.LatLngBounds(currentLocation);
  //     map.fitBounds(bounds);

  //     setMap(map)
  //   }, [])

  //   const onUnmount = React.useCallback(function callback(map) {
  //     setMap(null)
  //   }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>{currentLocation && <Marker position={currentLocation} />}</>
    </GoogleMap>
  ) : (
    <div>Map loading error</div>
  );
}

export default React.memo(MyComponent);
