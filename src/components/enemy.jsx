import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import stCall from '../mockStats.json'
import {useMonsters, MonstersUpdate} from '../context/battleContext'
import oakdexPokedex from 'oakdex-pokedex';

function Enemy(props) {
  const [activeMonster, setActiveMonster] = useState( props.monsters[0] );
  const [activeMonsterStats, setActiveMonsterStats] = useState({stCall});
  const [battleStats, setBattleStats] = useState();
  const [health, setHealth] = useState("100%")
  const [enemySprite, setEnemySprite] = useState();

  const monsters = useMonsters();
  const updateMonsters = MonstersUpdate();

  function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getSprite = async () => {
  let req = await axios.get( "https://pokeapi.co/api/v2/pokemon/" + activeMonster.name )
  setEnemySprite(req.data.sprites.front_default)
}


  useEffect(() => {

    if (!battleStats){
    const result = oakdexPokedex.findPokemon(jsUcfirst(activeMonster.name))
    setActiveMonsterStats(result)
    let moveList = result.move_learnsets[0].learnset;
    result.base_stats.maxHealth = result.base_stats.hp
    setBattleStats(result.base_stats)
    getSprite()
}
    if (monsters.origin === "player" && monsters.run === 0){
      let dmg = 2 * (monsters.attack.move.power * monsters.playerStats.atk / battleStats.def) / 50 + 2
      battleStats.hp -= dmg
      let health = Math.round(battleStats.hp / battleStats.maxHealth * 100)
      setHealth(health + " px" )
      updateMonsters({origin: "enemy", playerStats: battleStats, attack: undefined, run: 0})
    }
    

  },[monsters]);

  // useEffect(async () => {
  //   const result = await axios.get(activeMonster.url)
  //   setActiveMonsterStats(result.data)

  // },[activeMonster]);

  return (
    <div className="Enemy">
      <Container>
        <Row className="d-flex">
          <Col className="enemyLeft">
            <div className="enemyStats">
              <Card style={{ width: '100%' }}>
                <Card.Body className="enemyStatsBody">
                  <p className="monsterName">{activeMonster.name}</p>
                  <h5 className="monsterLevel mr-2">Lv5</h5>
                  {
                      battleStats && "HP: " + Math.floor(battleStats.hp)
                    }
                  <div className="enemyLife d-flex">
                   
                  <div className="enemyHealthBar" style={{minWidth: health}}>

                  </div>
                  </div>
                  
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className="enemyRight">
            {/* <div className="enemyMonster" style={{background: "url(" + activeMonsterStats.stCall.sprites.front_default + ")"}}>
            </div> */}
            <img className="enemyMonster" src={enemySprite}/>
            <div className="enemyGround">
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Enemy;
