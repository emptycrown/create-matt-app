import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { message } from 'antd';
import { render } from 'react-dom';
import App from './App';

// Only ever display 3 max messages at a time
message.config({
  maxCount: 3,
});

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
