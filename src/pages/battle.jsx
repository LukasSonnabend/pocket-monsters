import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import enemy from '../components/enemy'
import Enemy from '../components/enemy';


function Battle() {
    const [data, setData] = useState( JSON.parse(localStorage.getItem("MonsterList")) );
    const [ownMonsters, setOwnMonsters] = useState( data.slice(0, 5) );
    const [enemyMonsters, setEnemyMonsters] = useState( data.slice(5, 10) );
    

      useEffect(() => {
        console.log(data)
  },[]);

  return (
    <div className="Battle">
        <Enemy monsters={enemyMonsters}/>
        

    </div>
  );
}

export default Battle;
