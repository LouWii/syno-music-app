import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfileAdd from '../components/ProfileAdd'
import * as appActions from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    profiles: state.profiles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdd);