import React, { useContext, useState } from 'react'

const BattleContext = React.createContext();
const UpdateMonstersContext = React.createContext();

//create custom hook
export function useMonsters(){
  return useContext(BattleContext)
}

export function MonstersUpdate(){
  return useContext(UpdateMonstersContext)
}


export function BattleProvider({ children }) {
  const [monsters, setMonsters] = useState({own: undefined, enemy: undefined});
  //const [monsters, setMonsters] = useState(true);

  function UpdateMonsters(obj) {
    if (obj.origin == "player"){
      setMonsters(monsters.own = obj.monsInfo)
    } else {
      setMonsters(monsters.enemy = obj.monsInfo)
    }

  }

  // function EnemyMonsters(monsterObj){
  //   setEnemyMonsters(monsterObj)
  // }

  return (
    <BattleContext.Provider value={monsters} >
      <UpdateMonstersContext.Provider value={UpdateMonsters}>
        {children}
      </UpdateMonstersContext.Provider>
    </BattleContext.Provider>
  )


}