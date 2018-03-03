import { createStore, combineReducers } from 'redux';
import { mainListReducer } from './components/MainList/MainListReducer';

function testReducer(state = 'test', action) {
  return state;
}

const reducer = combineReducers({
  test: testReducer,
  financetypes: mainListReducer
});

const store = createStore(reducer);

export { store };