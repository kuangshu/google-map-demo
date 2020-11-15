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
  moveTo: (center: google.maps.LatLng) => void;
}

function MapControler({ createMarkers, markers, moveTo }: IProp) {
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
  useEffect(() => {
    console.log(markers.length);
    updateTotal(markers.length);
  }, [markers.length, updateTotal]);

  useEffect(() => {
    setPointData(
      markers.slice((pageNum - 1) * pageSize, pageNum * pageSize - 1),
    );
  }, [markers, pageNum, pageSize]);

  return (
    <div className='MapControler'>
      <button className='PointList-AddBtn' onClick={createMarker}>
        create marker
      </button>
      <PointList pointData={pointData} clickPoint={moveTo}></PointList>
      <Pagination
        pageNum={pageNum}
        nextPage={nextPage}
        prePage={prePage}></Pagination>
    </div>
  );
}

export default MapControler;

function getRandomNum(num: number) {
  return Number(((Math.random() - 0.5) * num).toFixed(5));
}

function getRandomLat() {
  return getRandomNum(180);
}
function getRandomLng() {
  return getRandomNum(360);
}
