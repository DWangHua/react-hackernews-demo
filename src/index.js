import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
// 热加载启动
if (module.hot) {
    module.hot.accept();
}
// registerServiceWorker();
