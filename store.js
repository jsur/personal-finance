import { createStore, combineReducers } from 'redux';

function testReducer(state = 'test', action) {
  return state;
}

const reducer = combineReducers({
  test: testReducer
});

const store = createStore(reducer);

export { store };