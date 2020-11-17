import React, { useRef } from 'react';
import { useEffect } from 'react';
import { centerPoint } from '../../Context';
import ColorControl from './ColorControl';
import './Map.css';

interface IProp {
  markers: google.maps.Marker[];
  createMap: (elementId: string, config: google.maps.MapOptions) => void;
  renderPolygon: () => google.maps.Polygon;
  addControl: (
    controlDiv: Element,
    postion: google.maps.ControlPosition,
  ) => void;
}
function Map({ createMap, renderPolygon, addControl }: IProp) {
  const colorControl = useRef<ColorControl | null>(null);

  useEffect(() => {
    createMap('map', {
      center: new google.maps.LatLng(centerPoint[0], centerPoint[1]),
    });
  }, [createMap]);

  useEffect(() => {
    const mapDom = document.getElementById('map') as HTMLElement;
    const clickHandle = () => {
      const polygon = renderPolygon();
      if (colorControl.current) {
        colorControl.current.updatePolygon(polygon);
      } else {
        colorControl.current = new ColorControl(polygon);
        addControl(
          colorControl.current.controlUI,
          google.maps.ControlPosition.BOTTOM_CENTER,
        );
      }
    };
    const listener = google.maps.event.addDomListener(
      mapDom,
      'contextmenu',
      clickHandle,
    );
    return () => {
      listener.remove();
    };
  }, [addControl, renderPolygon]);

  return <div id='map'></div>;
}

export default Map;
