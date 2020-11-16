import { useCallback, useRef } from 'react';
import GeoJsonDrawer from '../components/MapControler/GeoJsonDrawer';

const useGeoJson = (
  map: React.MutableRefObject<google.maps.Map<Element> | null>,
) => {
  const geoJsonDrawer = useRef<GeoJsonDrawer | null>(null);

  const geoJsonRender = useCallback(
    (geoString: JSON) => {
      if (geoJsonDrawer.current) {
        geoJsonDrawer.current.render(geoString);
      } else {
        geoJsonDrawer.current = new GeoJsonDrawer(map.current);
        geoJsonDrawer.current.render(geoString);
      }
    },
    [map],
  );

  const removeGeoJSONData = useCallback(() => {
    if (geoJsonDrawer.current) {
      geoJsonDrawer.current.clearAllFeatures();
    }
  }, []);

  return {
    geoJsonRender,
    removeGeoJSONData,
  };
};

export default useGeoJson;
