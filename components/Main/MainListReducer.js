import { connect } from 'react-redux';
import { Main } from './Main';

export function mainReducer(state = [
  {
    key: 'savings',
    sum: 1100
  },
  {
    key: 'crypto',
    sum: 14500
  },
  {
    key: 'stocks',
    sum: 9100
  },
  {
    key: 'testi',
    sum: 9100
  },
  {
    key: 'pekka',
    sum: 9100
  },
  {
    key: 'seppohovi',
    sum: 9100
  },
  {
    key: 'rami',
    sum: 9100
  }
], action) {
  switch(action.type) {
    default: {
      return state;
    }
  }
}

const mapStateToMainProps = (state) => {
  const financetypes = state.financetypes.map(f => (
    {
      key: f.key,
      sum: f.sum
    }
  ));
  return { financetypes };
}


const mapDispatchToMainProps = (dispatch) => (
  {
  }
);

export const MainContainer = connect(
  mapStateToMainProps,
  mapDispatchToMainProps
)(Main);