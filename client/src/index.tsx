import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
// import { applyMiddleware, createStore } from 'redux';
// import { rootReducer } from './redux/reducers/index';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { store } from './redux/store';



// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'));

