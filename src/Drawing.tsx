import { useRef, useState } from "react";
import {
  GoogleMap,
  DrawingManager,
  Polygon,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const libraries: any = ["drawing"];

const Drawing = () => {
  const mapRef = useRef<any>();
  const polygonRef = useRef<any>();
  const drawingManagerRef = useRef<any>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDJBumFjSoH-7NL9545OiwwS8iF-Mb_LW0",
    libraries: libraries,
  });

  const [polygon, setPolygon] = useState<any>(null);

  const defaultCenter = {
    lat: 30.1234777,
    lng: 31.6397073,
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const polygonOptions = {
    fillOpacity: 0.3,
    fillColor: "#ff0000",
    strokeColor: "#ff0000",
    strokeWeight: 2,
    draggable: true,
    editable: true,
  };

  const drawingManagerOptions = {
    polygonOptions: polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON],
    },
  };

  const onLoadMap = (map: any) => {
    mapRef.current = map;
  };

  const onLoadPolygon = (polygon: any) => {
    polygonRef.current = polygon;
  };

  const onOverlayComplete = ($overlayEvent: any) => {
    drawingManagerRef.current.setDrawingMode(null);

    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      if (polygonRef.current) {
        polygonRef.current.setMap(null); // Remove the existing polygon
      }

      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // Start and end point should be the same for a valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      handleMapClick(newPolygon);
      setPolygon(newPolygon);
      $overlayEvent.overlay?.setMap(null);
    }
  };

  const onEditPolygon = () => {
    if (polygonRef.current) {
      const coordinates = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));
      handleMapClick(coordinates);

      setPolygon(coordinates);
    }
  };

  const onDeletePolygon = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      setPolygon(null);
    }
  };

  const handleMapClick = (coordinatesArray: any) => {
    coordinatesArray.forEach(async (coordinate: any, index: any) => {
      const lat: any = coordinate.lat;
      const lng = coordinate.lng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        if (response.ok) {
          const data = await response.json();
          const addresstype = data.addresstype;

          // Check address properties to determine the location type
          const isaAddressTypeRoad = addresstype == "road";
          // const isBuilding = addresstype == "place";
          // const isWater = address?.waterway || address?.natural;

          if (!isaAddressTypeRoad) {
            // setPolygon(null);
            toast.error(
              `Oops!, The point ${
                index + 1
              } you selected does not represent a road.`,
              {
                theme: "colored",
              }
            );
          } else {
            toast.success(
              `Success!,  The point ${
                index + 1
              } you selected represent a road.`,
              {
                theme: "colored",
              }
            );
          }
        } else {
          toast.error("Oops!,Error Happened!", {
            theme: "colored",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Oops!,Error Happened!", {
          theme: "colored",
        });
      }
    });
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        zoom={15}
        center={defaultCenter}
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
      >
        <Marker position={defaultCenter} />
        {!polygon && (
          <DrawingManager
            onLoad={(drawingManager) =>
              (drawingManagerRef.current = drawingManager)
            }
            // Change to overlaycomplete event directly
            onOverlayComplete={onOverlayComplete}
            options={drawingManagerOptions}
          />
        )}
        {polygon && (
          <Polygon
            onLoad={onLoadPolygon}
            options={polygonOptions}
            paths={polygon}
            draggable
            editable
            onMouseUp={onEditPolygon}
          />
        )}
      </GoogleMap>
      <ToastContainer />

      <br />
      <br />
      {polygon && (
        <>
          <div
            onClick={onDeletePolygon}
            title="Delete shape"
            style={{
              cursor: "pointer",
              backgroundColor: "red",
              color: "white",
              width: "fit-content",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Delete
          </div>
          <div>
            <h2>coordinates</h2>
            {polygon.map((cord: any) => {
              return (
                <p key={Math.random()}>
                  <span>lat: {cord.lat}</span> <span>lng: {cord.lng}</span>
                </p>
              );
            })}
            <p></p>
          </div>
        </>
      )}
    </div>
  ) : null;
};

export default Drawing;
