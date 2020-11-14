import React, { createContext, useState } from 'react';
import './App.css';
import Map from './components/Map/Map';
import MapControler from './components/MapControler/MapControler';
import { PointItem } from './types/types';

const initPointArr: PointItem[] = [];
export const Context: React.Context<PointItem[]> = createContext(initPointArr);

function App() {
  const [pointArr, setPointArr] = useState(initPointArr);
  return (
    <div className='App'>
      <Context.Provider value={pointArr}>
        <Map pointData={pointArr} />
        <MapControler setPointArr={setPointArr}></MapControler>
      </Context.Provider>
    </div>
  );
}

export default App;
