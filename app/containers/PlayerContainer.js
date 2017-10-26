import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PlayerBlock from './PlayerBlock'
import * as appActions from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    client: state.client,
    profiles: state.profiles,
    player: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBlock);