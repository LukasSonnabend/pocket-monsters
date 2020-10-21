import React, { Component }  from 'react'

const UserContext = React.createContext({
    playerMonster: "",
    enemyMonster: "",
})

class UserProvider extends Component {
    // Context state
    state = {
        playerMonster: "",
        enemyMonster: "",
    }
    
  
    // Method to update state
    setOwnMonster = (user) => {
      this.setState((prevState) => ({ user }))
    }

    setEnemyMonster = (user) => {
        this.setState((prevState) => ({ user }))
      }
  
    render() {
      const { children } = this.props
      const { playerMonster } = this.state
      const { enemyMonster } = this
  
      return (
        <UserContext.Provider
          value={{
            playerMonster,
            enemyMonster,
          }}
        >
          {children}
        </UserContext.Provider>
      )
    }
  }
  
  export default UserContext
  
  export { UserProvider }