import React, { useCallback } from 'react';
import './App.css';
import Map from './components/Map/Map';
import MapControler from './components/MapControler/MapControler';
import useMap from './hook/useMap';
import useMarker from './hook/useMarker';
import usePolygon from './hook/usePolygon';

function App() {
  const { map, createMap, moveTo, addControl } = useMap();
  const { markers, createMarkers, removeMarker } = useMarker(map);
  const { renderPolygon, removePolygon } = usePolygon(map);

  const renderPolygon_ = useCallback(() => {
    let p = renderPolygon(markers);
    removeMarker();
    return p;
  }, [markers, removeMarker, renderPolygon]);

  const createMarkers_ = useCallback(
    (points) => {
      removeMarker();
      removePolygon();
      createMarkers(points);
    },
    [createMarkers, removeMarker, removePolygon],
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
          ,
          <MapControler
            markers={markers}
            createMarkers={createMarkers_}
            moveTo={moveTo}
          />
        </>
      ) : (
        <div>google 服务异常</div>
      )}
    </div>
  );
}

export default App;
