import React from 'react';
import './App.css';

import ReactDOM from 'react-dom';
import NodeVisualizer from './components/NodeVisualizer';

function App() {
  return <NodeVisualizer />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
