import { connect } from 'react-redux';
import { MainList } from './MainList';

export function mainListReducer(state = [
  {
    key: 'savings',
    sum: 1100
  },
  {
    key: 'cryptos',
    sum: 14500
  },
  {
    key: 'stocks',
    sum: 9100
  }
], action) {
  switch (action.type) {
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
)(MainList);