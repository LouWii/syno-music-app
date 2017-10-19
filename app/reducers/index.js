import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import client from './client'
import profiles from './profiles'
import ui from './ui'
import popup from './popup'

const rootReducer = combineReducers({profiles, client, ui, popup, routing: routerReducer});

export default rootReducer;
