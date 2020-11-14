import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { PointItem } from '../../types/types';
import './Map.css';

interface IProp {
  pointData: PointItem[];
}
function Map({ pointData }: IProp) {
  const map = useRef<AMap.Map | null>(null);

  useEffect(() => {
    map.current = new AMap.Map('map', {});
  }, []);

  useEffect(() => {
    const markers = pointData.map(
      (point) =>
        new AMap.Marker({
          position: new AMap.LngLat(...point),
        })
    );
    map.current?.add(markers);
  }, [pointData]);

  return <div id='map'></div>;
}

export default Map;
