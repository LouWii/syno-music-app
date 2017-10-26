import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfilesList from '../components/ProfilesList'
import * as appActions from '../actions/actionCreators';

function mapStateToProps(state) {
  return {
    profiles: state.profiles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesList);