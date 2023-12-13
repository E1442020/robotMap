import React, { useRef, useState } from "react";
import {
  GoogleMap,
  DrawingManager,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";

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
    lat: 28.626137,
    lng: 79.821603,
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

      setPolygon(coordinates);
    }
  };

  const onDeletePolygon = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      setPolygon(null);
    }
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        zoom={15}
        center={defaultCenter}
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
      >
        <DrawingManager
          onLoad={(drawingManager) =>
            (drawingManagerRef.current = drawingManager)
          }
          // Change to overlaycomplete event directly
          onOverlayComplete={onOverlayComplete}
          options={drawingManagerOptions}
        />
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
                <p>
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
