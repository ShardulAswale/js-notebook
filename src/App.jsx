import React from 'react';
import CodeEditor from './Components/Editor';

function App() {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <h1>JavaScript Code Editor</h1>
        <CodeEditor />
      </div>
    </div>
  );
}

export default App;