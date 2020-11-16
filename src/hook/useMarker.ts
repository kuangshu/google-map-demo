import { useCallback, useState } from 'react';
import { PointItem } from '../types/types';

const useMarker = (
  map: React.MutableRefObject<google.maps.Map<Element> | null>,
) => {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const createMarker = useCallback(
    (point: PointItem) => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(point[0], point[1]),
      });
      setMarkers((markers) => [...markers, marker]);
      marker.setMap(map.current);
    },
    [map],
  );
  const createMarkers = useCallback(
    (points: PointItem[]) => {
      let newMarkers = points.map((point) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(point[0], point[1]),
        });
        marker.setMap(map.current);
        return marker;
      });
      setMarkers((markers) => [...markers, ...newMarkers]);
    },
    [map],
  );
  const removeMarkers = useCallback(() => {
    markers.map((marker) => marker.setMap(null));
    setMarkers([]);
  }, [markers]);
  return {
    markers,
    createMarker,
    createMarkers,
    removeMarkers,
  };
};

export default useMarker;
