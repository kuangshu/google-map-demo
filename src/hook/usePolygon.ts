import { useCallback, useState } from 'react';

const usePolygon = (
  map: React.MutableRefObject<google.maps.Map<Element> | null>,
) => {
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);

  const renderPolygon = useCallback(
    (markers: google.maps.Marker[]) => {
      if (polygon) return polygon;
      let paths: google.maps.LatLng[] = [];

      for (let index = 0; index < markers.length; index++) {
        const marker = markers[index];
        let position = marker.getPosition();
        if (position) paths.push(position);
      }

      const newPolygon = new google.maps.Polygon({
        paths: paths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });
      newPolygon.setMap(map.current);
      setPolygon(newPolygon);
      return newPolygon;
    },
    [map, polygon],
  );
  const removePolygon = useCallback(() => {
    polygon?.setMap(null);
    setPolygon(null);
  }, [polygon]);

  return {
    renderPolygon,
    removePolygon,
  };
};
export default usePolygon;
