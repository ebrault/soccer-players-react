import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link, withRouter, Redirect } from 'react-router-dom'

class UpdatePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      player: {
        name: '',
        number: '',
        position: '',
        team: '',
        edited: false
      },
      flashMessage: ''
    }
    this.player = this.state.player
  }

  async componentDidMount() {
    const response = await axios.get(apiUrl + '/players/' + `${this.props.match.params.id}`,
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Token token=${this.state.user.token}`
        }
      }
    )
    this.setState({player: response.data.player})
  }

  handleChange = (event) => {
    const editedPlayer = {...this.state.player, [event.target.name]: event.target.value}
    this.setState({player: editedPlayer})
  }

  handleSubmit = async (event, user) => {
    event.preventDefault()

    const playerParams = JSON.stringify({player: this.state.player})
    const response = await axios({method: 'patch',
      url: apiUrl + '/players/' + `${this.props.match.params.id}`,
      data: playerParams,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${this.state.user.token}`
      }
    }
    )
    this.setState({player: response.data.player})
    this.props.history.push('/players')
  }

  render() {
    const { id, user } = this.props
    const { player } = this.state
    if(this.state.edited === true) {
      return <Redirect to='/players'/>
    }
    return(
      <React.Fragment>
        <div className="IndexPlayers">
          <h1>Edit Player</h1>
          <p>{this.state.flashMessage}</p>
          <form>
            <input name='name' type="text" value={this.state.player.name} onChange={this.handleChange} placeholder='Name' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='number' type="text" value={this.state.player.number} onChange={this.handleChange} placeholder='Number' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='position' type="text" value={this.state.player.position} onChange={this.handleChange} placeholder='Position' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='team' type="text" value={this.state.player.team} onChange={this.handleChange} placeholder='Team' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <button type='submit' onClick={(event) => this.handleSubmit(event, user)}>Update</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter (UpdatePlayer)
