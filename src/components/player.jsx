import React, { useState, useEffect, useCallback, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import PromptBox from '../components/promptbox';
import stCall from '../mockStatsPlayer.json'
import {useMonsters, MonstersUpdate} from '../context/battleContext'
import oakdexPokedex from 'oakdex-pokedex';


function Player(props) {

  function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  const [activeMonster, setActiveMonster] = useState( props.monsters[0] );
  const [activeMonsterStats, setActiveMonsterStats] = useState({stCall});
  const [playerAttackInfo, setPlayerAttackInfo] = useState()
  const [battleStats, setBattleStats] = useState();


  //context api
  const monsters = useMonsters();
  const updateMonsters = MonstersUpdate();

  useEffect(() => {
    const result = oakdexPokedex.findPokemon(jsUcfirst(activeMonster.name))
    setActiveMonsterStats(result)
    setBattleStats(result.base_stats)
  
    if (battleStats) updateMonsters({origin: "player", playerStats: battleStats, attack: playerAttackInfo, run: 0})
    
  },[activeMonster, playerAttackInfo])



  //get attack info
  const playerAttack = useCallback((childData) => {
    setPlayerAttackInfo(childData)
  },[])




  // useEffect(async () => {
  //   const result = await axios.get(activeMonster.url)
  //   setActiveMonsterStats(result.data)

  // },[activeMonster]);

  return (
    <div className="Player">
      <Container>
        <Row className="d-flex" style={{flexDirection: "row-reverse"}}>
          <Col className="playerLeft">
            <div className="playerStats">
              <Card style={{ width: '100%' }}>
                <Card.Body className="playerStatsBody">
                  <p className="monsterName">{activeMonster.name}</p>
                  <h5 className="monsterLevel mr-2">Lv5</h5>
                  <div className="playerLife d-flex">
                    <h4>HP</h4>
                  <div className="playerHealthBar">

                  </div>
                  </div>
                  
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className="playerRight">
            <img className="playerMonster" src={stCall.sprites.back_default}/>
            <div className="playerGround">
              </div>
          </Col>
        </Row>
      </Container>
      <PromptBox parentCallback={playerAttack} monsters={props.monsters} activeMonster={activeMonster} />
    </div>
  );
}

export default Player;
