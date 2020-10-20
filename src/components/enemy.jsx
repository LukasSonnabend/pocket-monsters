import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import stCall from '../mockStats.json'

function Enemy(props) {
  const [activeMonster, setActiveMonster] = useState( props.monsters[0] );
  const [activeMonsterStats, setActiveMonsterStats] = useState({stCall});
  

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
                  <div className="enemyLife d-flex">
                    <h4>HP</h4>
                  <div className="enemyHealthBar">

                  </div>
                  </div>
                  
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className="enemyRight">
            {/* <div className="enemyMonster" style={{background: "url(" + activeMonsterStats.stCall.sprites.front_default + ")"}}>
            </div> */}
            <img className="enemyMonster" src={activeMonsterStats.stCall.sprites.front_default}/>
            <div className="enemyGround">
              </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Enemy;
