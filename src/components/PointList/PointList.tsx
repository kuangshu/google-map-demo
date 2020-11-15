import React from 'react';
import './PointList.css';

interface IProp {
  pointData: google.maps.Marker[];
  clickPoint: (center: google.maps.LatLng) => void;
}
function PointList({ pointData, clickPoint }: IProp) {
  const clickHandle: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'LI') {
      let index = Number(target.dataset.index);
      let position = pointData[index].getPosition();
      position && clickPoint(position);
    }
  };
  return (
    <ul className='PointList' onClick={clickHandle}>
      {pointData.map((point, index) => (
        <li className='PointList-Item' key={index} data-index={index}>
          ({point.getPosition()?.lat().toFixed(5)},{' '}
          {point.getPosition()?.lng().toFixed(5)})
        </li>
      ))}
    </ul>
  );
}

export default PointList;
