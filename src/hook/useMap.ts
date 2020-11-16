import { useCallback, useRef } from 'react';
import { centerPoint } from '../Context';

const useMap = () => {
  const map = useRef<google.maps.Map | null>(null);

  const createMap = useCallback(
    (elementId: string, config: google.maps.MapOptions) => {
      map.current = new google.maps.Map(
        document.getElementById(elementId) as HTMLElement,
        {
          center: new google.maps.LatLng(centerPoint[0], centerPoint[1]),
          zoom: 10,
          ...config,
        },
      );
    },
    [],
  );

  const moveTo = (center: google.maps.LatLng) => {
    map.current?.setCenter(center);
  };

  const addControl = useCallback(
    (controlUI: Element, postion: google.maps.ControlPosition) => {
      const colorControlDiv = document.createElement('div');
      colorControlDiv.appendChild(controlUI);
      map.current?.controls[postion].push(colorControlDiv);
    },
    [],
  );

  return {
    map,
    createMap,
    moveTo,
    addControl,
  };
};

export default useMap;
