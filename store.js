import { createStore, combineReducers } from 'redux';
import { mainReducer } from './components/Main/MainListReducer';

function testReducer(state = 'test', action) {
  return state;
}

const reducer = combineReducers({
  test: testReducer,
  financetypes: mainReducer
});

const store = createStore(reducer);

export { store };