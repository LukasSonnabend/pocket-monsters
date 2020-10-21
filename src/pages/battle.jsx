import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Enemy from '../components/enemy';
import Player from '../components/player';
import {useMonsters, MonstersUpdate} from '../context/battleContext'



function Battle() {
    const [data, setData] = useState( JSON.parse(localStorage.getItem("MonsterList")) );
    const [ownMonsters, setOwnMonsters] = useState( data.slice(0, 5) );
    const [enemyMonsters, setEnemyMonsters] = useState( data.slice(5, 10) );

    const monsters = useMonsters();
    const updateMonsters = MonstersUpdate();
    
    let callbackFunction = (childData) => {
      updateMonsters(childData)
    }
    


      useEffect(() => {
        console.log(data)



  },[]);

  return (
    <div className="Battle">
        <button onClick={updateMonsters}>X</button>
        <Enemy monsters={enemyMonsters}/>
        <Player parentCallback={callbackFunction} monsters={ownMonsters}/>
    </div>
  );
}

export default Battle;
