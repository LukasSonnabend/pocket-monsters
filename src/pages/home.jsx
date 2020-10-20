import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import stCall from '../mockData.json'


function Home() {
  const [data, setData] = useState({ stCall });
  let offset = Math.floor(Math.random() * 141)


  // useEffect(async () => {
  //   const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + offset)

  //   setData(result.data);
  // },[]);


  localStorage.setItem("MonsterList", JSON.stringify(data.stCall))

  return (
    <div className="Home">
      <h2>Welcome to the</h2>
      <h4 className="title">PocketMonster Battle Simulator</h4>
      <Link to={{
        pathname: '/battle',
        state: {
          fromNotifications: true
        }
        }}>
          <Button variant="primary">Go</Button>{' '}
      </Link>
    </div>
  );
}

export default Home;
