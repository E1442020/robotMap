// import React, { useEffect, useState } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "700px",
//   height: "500px",
// };

// // const center = {
// //     lat :30.040904864466672, lng:31.209323080460027
// // };

// function MyComponent() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyDJBumFjSoH-7NL9545OiwwS8iF-Mb_LW0",
//   });
//   const [currentLocation, setCurrentLocation] = useState<any>(null);

//   const [map, setMap] = React.useState<any>(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   useEffect(() => {
//     if (isLoaded && currentLocation && map) {
//       const bounds = new window.google.maps.LatLngBounds(currentLocation);
//       map.fitBounds(bounds);
//     }
//   }, [isLoaded, currentLocation, map]);

//   const onLoad = React.useCallback(function callback(map: any) {
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback() {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={currentLocation}
//       zoom={1}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <>{currentLocation && <Marker position={currentLocation} />}</>
//     </GoogleMap>
//   ) : (
//     <div>Map loading error</div>
//   );
// }

// export default React.memo(MyComponent);

import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "700px",
  height: "500px",
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJBumFjSoH-7NL9545OiwwS8iF-Mb_LW0", // Replace with your Google Maps API key
  });
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && currentLocation && map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(currentLocation);
      map.fitBounds(bounds);
    }
  }, [isLoaded, currentLocation, map]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={15} // Adjust the zoom level as per your needs
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {currentLocation && <Marker position={currentLocation} />}
    </GoogleMap>
  ) : (
    <div>Map loading error</div>
  );
}

export default React.memo(MyComponent);
