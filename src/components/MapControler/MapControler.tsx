import React from 'react';
import { PointItem } from '../../types/types';
import Pagination from '../Pagination/Pagination';
import PointList from '../PointList/PointList';

interface IProp {
  setPointArr: React.Dispatch<React.SetStateAction<PointItem[]>>;
}

function MapControler(props: IProp) {
  const createMarker = () => {
    props.setPointArr([[123, 123]]);
  };
  return (
    <div className='MapControler'>
      <button className='PointList-AddBtn' onClick={createMarker}>
        create marker
      </button>
      <PointList></PointList>
      <Pagination></Pagination>
    </div>
  );
}

export default MapControler;
