import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import client from './client'
import profiles from './profiles'
import ui from './ui'
import popup from './popup'
import player from './player'

const rootReducer = combineReducers({profiles, client, ui, popup, player, routing: routerReducer});

export default rootReducer;
