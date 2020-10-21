import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import oakdexPokedex from 'oakdex-pokedex';
import stCall from '../mockStatsPlayer.json';

function Promptbox(props) {
  const [status, setStatus] = useState();
  const [activeMonster, setActiveMonster] = useState(props.activeMonster);
  const [activeMonsterStats, setActiveMonsterStats] = useState();
  const [gameMonster, setGameMonster] = useState();
  const [activeMonsterMoves, setActiveMonsterMoves] = useState();
  const [selectAttack, setSelectAttack] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // returns data/pokemon/eevee.json
  // console.log(eevee.names.en); // Eeevee

  function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function attack( selectAttack ){
  selectAttack.move.pp -= 1;
  setSelectAttack(
    {
      index: selectAttack.index,
      move: selectAttack.move
    }
  )
  props.parentCallback(selectAttack.move.power)
}








function createMonster(stats, moveList) {
  let movesArray = []
  
  for (let move in moveList ){
    console.log(oakdexPokedex.findMove(moveList[move]))
    movesArray.push(oakdexPokedex.findMove(moveList[move].move))
  }
  console.log("moves: " + movesArray)
  return {
    name: activeMonster.name,
    baseStats: stats.base_stats,
    moves: movesArray
  }
}






  useEffect(() => {
    const result = oakdexPokedex.findPokemon(jsUcfirst(props.activeMonster.name))
    setActiveMonsterStats(result)
    let moveList = result.move_learnsets[0].learnset;
    setActiveMonsterMoves(moveList.slice(0, 4))
    setGameMonster(createMonster(result, moveList.slice(0, 4)))
  },[activeMonster]);

  return (<>
    { !status &&


      <>
        <div className="Promptbox">
          <div className="PromptTextBox">
            <p>
              What will YOU do?
            {/* {JSON.stringify(activeMonsterStats)} */}
            </p>

          </div>
          <div className="selectAction">
            <div className="fight">
              <Button onClick={e => setStatus(e.target.value)} value="fight" variant="danger">Fight</Button>{' '}
            </div>
            <div className="bag">
              <Button variant="warning">Bag</Button>{' '}
            </div>
            <div className="monsters">
              <Button onClick={handleShow} variant="success">Monsters</Button>{' '}
            </div>
            <div className="quit">
              <Button variant="info">Quit</Button>{' '}
            </div>
          </div>
        </div>
      </>
    }

    { status === "fight" &&


      <>
        <div className="AttacksBox">
          <div className="attacks">

          {
                gameMonster.moves.map( ( move, index )  => {
                  return <>
                      <div key={index}>
                          <h2 onClick={ () => setSelectAttack({index: index, move: move})}>{move.names.en}</h2>
                      </div>

                  </>
                }) 
              }

          </div>

          <div className="AttacksStatusBox">
          {/* { selectAttack && selectAttack.names.en } */}
          PP { selectAttack && selectAttack.move.pp}
          <br></br>
          Type/{selectAttack && selectAttack.move.type}
          <br></br>
            { selectAttack && <Button variant="success" onClick={() => attack( selectAttack )}>Attack</Button>}
            <Button variant="danger" onClick={e => setStatus(e.target.value)} value={undefined}>Back</Button>{' '}
          </div>

        </div>
      </>
    }

    { show && <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {
                props.monsters.map( ( {name}, index )  => {
                  return <>
                      <tr key={index}>
                          <td>{index+1}</td>
                          <td>{name}</td>
                          <td>
                            <div className="playerHealthBar">
                              <div className="playerLife">
                              </div>
                            </div>
                          </td>
                          <td>
                            
                          </td>
                      </tr>

                  </>
                }) 
              }
            </tbody>
          </Table>







        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
    }







  </>
  );
}

export default Promptbox;
