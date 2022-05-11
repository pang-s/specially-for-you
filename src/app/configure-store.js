import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { MAIN_LOG_MOUSE_MOVE } from '../actions/types'

const initialState = {};
const middleware = [thunk];
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["init"] 
}
const persistedReducer = persistReducer(persistConfig, reducers)

const actionSanitizer = (action) => (
  action.type === MAIN_LOG_MOUSE_MOVE && action.data ?
  { ...action, data: '<<LONG_BLOB>>' } : action
)

// let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
var devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__({
    actionSanitizer,
    stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
  })
  : f => f;
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  devTools = a => a;
}

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);
const persistor = persistStore(store);
//uncomment purge to delete redux persist states on refresh
// persistor.purge()
export { store, persistor };
