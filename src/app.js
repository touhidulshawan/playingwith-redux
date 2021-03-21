const redux = require("redux");
const reduxLogger = require("redux-logger");

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

const logger = reduxLogger.createLogger();

// actions
const buyCakeAction = () => {
  return {
    type: BUY_CAKE,
    payload: "Buying a cake",
  };
};

const buyIceCreamAction = () => {
  return {
    type: BUY_ICECREAM,
    payload: "Buying Ice Creame",
  };
};

// initial state for cake
const cakeInitialState = {
  numOfCake: 10,
};

// initial state for ice-cream
const iceCreamInitialState = {
  numOfIceCream: 20,
};

// reducer

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, numOfCake: state.numOfCake - 1 };
    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamInitialState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    default:
      return state;
  }
};

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = redux.createStore(rootReducer, redux.applyMiddleware(logger));
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCakeAction());
store.dispatch(buyCakeAction());
store.dispatch(buyIceCreamAction());
store.dispatch(buyIceCreamAction());
unsubscribe();
