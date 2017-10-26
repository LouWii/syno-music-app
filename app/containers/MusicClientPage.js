import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ASClient from '../components/ASClient'
import * as appActions from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
    client: state.client,
    player: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ASClient);