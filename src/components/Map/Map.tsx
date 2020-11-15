import React, { useRef } from 'react';
import { useEffect } from 'react';
import { centerPoint } from '../../Context';
import './Map.css';

interface IProp {
  markers: google.maps.Marker[];
  createMap: (elementId: string, center: google.maps.LatLng) => void;
  renderPolygon: () => google.maps.Polygon;
  addControl: (
    controlDiv: Element,
    postion: google.maps.ControlPosition,
  ) => void;
}
function Map({ createMap, renderPolygon, addControl }: IProp) {
  const colorControl = useRef<ColorControl | null>(null);

  useEffect(() => {
    createMap('map', new google.maps.LatLng(centerPoint[0], centerPoint[1]));
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

class ColorControl {
  private polygon_: google.maps.Polygon;
  public controlUI: HTMLElement;
  constructor(polygon: google.maps.Polygon) {
    this.polygon_ = polygon;
    this.controlUI = document.createElement('button');
    this.controlUI.style.marginBottom = '30px';
    this.controlUI.style.borderRadius = '3px';
    this.controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    this.controlUI.style.cursor = 'pointer';
    this.controlUI.style.textAlign = 'center';
    this.controlUI.innerHTML = "Click to change the Polygon's Color";

    this.controlUI.addEventListener('click', () => {
      this.polygon_.setOptions({
        fillColor: randomColor(),
      });
    });
  }
  updatePolygon(polygon: google.maps.Polygon) {
    this.polygon_ = polygon;
  }
}

function randomColor() {
  const colors = ['#1b486b', '#28a352', '#b2db34', '#f2ac34', '#fc7634'];
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

export default Map;
