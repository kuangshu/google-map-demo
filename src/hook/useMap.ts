import { useCallback, useRef } from 'react';

const useMap = () => {
  const map = useRef<google.maps.Map | null>(null);

  const createMap = useCallback(
    (elementId: string, center: google.maps.LatLng) => {
      map.current = new google.maps.Map(
        document.getElementById(elementId) as HTMLElement,
        {
          center: center,
          zoom: 8,
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
