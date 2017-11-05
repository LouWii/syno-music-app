import React from 'react'
import Player from '../components/Player'

class PlayerBlock extends React.Component {

  render() {
    return (
      <div>
        {this.props.player.songs && this.props.player.songs.length > 0 &&
          <Player 
            playerPlayPause={this.props.playerPlayPause}
            playerPrevious={this.props.playerPrevious}
            playerNext={this.props.playerNext}
            player={this.props.player}
            profile={this.props.profiles[this.props.client.selectedProfileIndex]}
          />
        }
      </div>
    )
  }
}

export default PlayerBlock