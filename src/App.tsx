import React, { useCallback } from 'react';
import './App.css';
import Map from './components/Map/Map';
import MapControler from './components/MapControler/MapControler';
import useGeoJson from './hook/useGeoJson';
import useMap from './hook/useMap';
import useMarker from './hook/useMarker';
import usePolygon from './hook/usePolygon';

function App() {
  const { map, createMap, moveTo, addControl } = useMap();
  const { markers, createMarkers, removeMarkers } = useMarker(map);
  const { renderPolygon, removePolygon } = usePolygon(map);
  const { geoJsonRender, removeGeoJSONData} = useGeoJson(map);

  const renderPolygon_ = useCallback(() => {
    let p = renderPolygon(markers);
    removeMarkers();
    return p;
  }, [markers, removeMarkers, renderPolygon]);

  const createMarkers_ = useCallback(
    (points) => {
      removeMarkers();
      removePolygon();
      createMarkers(points);
    },
    [createMarkers, removeMarkers, removePolygon],
  );

  return (
    <div className='App'>
      {window.google ? (
        <>
          <Map
            markers={markers}
            createMap={createMap}
            renderPolygon={renderPolygon_}
            addControl={addControl}
          />
          <MapControler
            markers={markers}
            createMarkers={createMarkers_}
            removeMarkers={removeMarkers}
            moveTo={moveTo}
            geoJsonRender={geoJsonRender}
            removeGeoJSONData={removeGeoJSONData}
          />
        </>
      ) : (
        <div>google 服务异常</div>
      )}
    </div>
  );
}

export default App;
