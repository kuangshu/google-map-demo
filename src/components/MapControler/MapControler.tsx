import './MapControler.css';
import React, { useEffect, useState } from 'react';
import { PointItem } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import PointList from '../PointList/PointList';
import { centerPoint } from '../../Context';
import usePagination from '../../hook/usePagination';

interface IProp {
  markers: google.maps.Marker[];
  createMarkers: (points: PointItem[]) => void;
  removeMarkers: () => void;
  moveTo: (center: google.maps.LatLng) => void;
  geoJsonRender: (geoJSON: JSON) => void;
  removeGeoJSONData: () => void;
}

function MapControler({
  createMarkers,
  removeMarkers,
  markers,
  moveTo,
  geoJsonRender,
  removeGeoJSONData,
}: IProp) {
  const {
    state: { pageNum, pageSize },
    nextPage,
    prePage,
    updateTotal,
    goFirstPage,
  } = usePagination(0);
  let [pointData, setPointData] = useState<google.maps.Marker[]>([]);
  const createMarker = () => {
    goFirstPage();
    let points: PointItem[] = [];
    while (points.length < 5000) {
      points.push([
        centerPoint[0] + getRandomLat(),
        centerPoint[1] + getRandomLng(),
      ]);
    }

    createMarkers(points);
    setPointData(
      markers.slice((pageNum - 1) * pageSize, pageNum * pageSize - 1),
    );
  };
  const fetchFileAndRender = () => {
    shapefile
      .open('https://cdn.rawgit.com/mbostock/shapefile/master/test/points.shp')
      // .open('https://drive.google.com/file/d/1YM-VYnfKyFIY8KBPrQOYz4UQ5vuYidxU')
      // .open('/AUS_zone.shp')
      .then((source) =>
        source.read().then(function log(result): Promise<any> | undefined {
          if (result.done) return;
          console.log(result.value);
          geoJsonRender(result.value);
          return source.read().then(log);
        }),
      )
      .catch((error) => console.error(error.stack));
  };
  useEffect(() => {
    updateTotal(markers.length);
  }, [markers.length, updateTotal]);

  useEffect(() => {
    setPointData(
      markers.slice((pageNum - 1) * pageSize, pageNum * pageSize - 1),
    );
  }, [markers, pageNum, pageSize]);

  const createBtnRightClickHandle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    removeMarkers();
  };
  const geoBtnRightClickHandle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    removeGeoJSONData();
  };

  return (
    <div className='MapControler'>
      <div>
        <button
          className='PointList-AddBtn'
          onClick={createMarker}
          onContextMenu={createBtnRightClickHandle}>
          create marker
        </button>
        <button
          onClick={fetchFileAndRender}
          onContextMenu={geoBtnRightClickHandle}>
          draw geoJSON file
        </button>
      </div>
      <PointList pointData={pointData} clickPoint={moveTo}></PointList>
      <Pagination
        pageNum={pageNum}
        nextPage={nextPage}
        prePage={prePage}></Pagination>
    </div>
  );
}

function getRandomNum(num: number) {
  return Number(((Math.random() - 0.5) * num).toFixed(5));
}

function getRandomLat() {
  return getRandomNum(180);
}
function getRandomLng() {
  return getRandomNum(360);
}

export default MapControler;
