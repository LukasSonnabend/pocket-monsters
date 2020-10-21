import React, { useState, useEffect, useCallback, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import PromptBox from '../components/promptbox';
import stCall from '../mockStatsPlayer.json'



function Player(props) {



  const [activeMonster, setActiveMonster] = useState( props.monsters[0] );
  const [activeMonsterStats, setActiveMonsterStats] = useState({stCall});
  const [playerAttackInfo, setPlayerAttackInfo] = useState()
  

  //get attack info
  const playerAttack = useCallback((childData) => {
    setPlayerAttackInfo(childData)
  },[])

  useEffect(() => {

  },[playerAttackInfo])

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
            <img className="playerMonster" src={activeMonsterStats.stCall.sprites.back_default}/>
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
