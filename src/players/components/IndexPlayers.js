import React, { component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import CreatePlayer from './CreatePlayer.js'
import UpdatePlayer from './UpdatePlayer.js'

class IndexPlayers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      players: []
    }
  }
  async componentDidMount() {
    const response = await axios.get(apiUrl + '/players', {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    console.log('player data', response.data.players)
    this.setState({players: response.data.players})
  }

  async deletePlayer(event, playerId) {
    event.preventDefault()
    await axios.delete(apiUrl + '/players/' + `${playerId}`, {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    this.setState({players: this.state.players.filter(player => player.id !== playerId)})
  }

  render() {
    const { user } = this.props
    const playerRows = this.state.players.map(player => {
      const { id, name, number, position, team } = player
      return (
        <tr key={id} className="table-info">
          <td className="table-primary">{ name }</td>
          <td className="table-primary">{ number }</td>
          <td className="table-primary">{ position }</td>
          <td className="table-primary">{ team }</td>
          <td>
            <Link to={`/players/${player.id}/update`}>update</Link> | <a href="" onClick={(event) => this.deletePlayer(event, player.id)}>delete</a>
          </td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <div className="IndexPlayers">
          <h1>Players</h1>
          <h3 style={{display: 'inline-block'}}>
            <Link to="/CreatePlayer" className="btn btn-primary">Add Player</Link>
          </h3>
          <table className="table">
            <tbody>
              {playerRows}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter (IndexPlayers)
