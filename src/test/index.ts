import { Dispatch, createStore, applyMiddleware } from 'redux';
import loggerMiddleware from '../loggerMiddleware';
import thunk from 'redux-thunk';
// console.clear();
// Dom
const increaseButton = document.createElement('button');
const decreaseButton = document.createElement('button');
const span = document.createElement('span');
increaseButton.innerText = 'Increament';
decreaseButton.innerText = 'Decreament';
span.innerText = ' hi!😉 ';

document.body.insertAdjacentElement('afterbegin', increaseButton);
document.body.insertAdjacentElement('afterbegin', span);
document.body.insertAdjacentElement('afterbegin', decreaseButton);
// interfaces
interface Action {
  type: 'INCREAMENT' | 'DECREAMENT';
}
interface DefaultState {
  value: number;
}

// dummy reducer
function reducer(
  state: DefaultState = { value: 0 },
  action: Action
): DefaultState {
  switch (action.type) {
    case 'INCREAMENT':
      return { ...state, value: state.value + 1 };
    case 'DECREAMENT':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

//store
const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware));
// action creators Async
const increamentActionAsync = () => (dispatch: Dispatch) => {
  setTimeout(dispatch, 1000, { type: 'INCREAMENT' });
};

const decreamentActionAsync = () => (dispatch: Dispatch) => {
  setTimeout(dispatch, 1000, { type: 'DECREAMENT' });
};
// render
function render() {
  span.innerText = ' ' + store.getState().value.toString() + ' ';
}
store.subscribe(render);
increaseButton.onclick = () => {
  store.dispatch(increamentActionAsync() as any);
  //   thunkedLogin();
};

decreaseButton.onclick = () => {
  // store.dispatch({ type: 'DECREAMENT' });
  store.dispatch(decreamentActionAsync() as any);
};
render();
console.log(Math.random());
