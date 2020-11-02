import React, { useMemo } from 'react';
import '../styles/globals.css'
import "../styles/antd.less";
import {createStore} from 'redux';
import { myReducer } from '../reducers/index';
import { Provider } from 'react-redux';


const store = createStore(  
  myReducer
);

function MyApp({ Component, pageProps, staffs }) {
  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
