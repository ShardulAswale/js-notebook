// CodeCell.jsx
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Card, CardContent, Paper, Button } from '@mui/material';
import ToolbarComponent from './ToolBar';

const CodeCell = ({ cell, onChange, onDelete, onMoveUp, onMoveDown, onDuplicate }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      let capturedConsoleOutput = '';
      const originalConsoleLog = console.log;
      console.log = (message) => {
        capturedConsoleOutput += message + '\n';
        setOutput((prevOutput) => prevOutput + message + '\n');
      };
      const result = new Function(cell.content)();
      console.log = originalConsoleLog;
      setOutput((prevOutput) => prevOutput + (result !== undefined ? result.toString() : ''));
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <Card style={{ width: '100%', position: 'relative', boxSizing: 'border-box', marginBottom: '10px' }}>
      {isFocused && (
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
          <ToolbarComponent
            cell={cell}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onCopy={() => {}}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        </div>
      )}
      <CardContent>
        <CodeMirror
          value={cell.content}
          extensions={[javascript()]}
          theme={oneDark}
          onChange={(value) => onChange(cell.id, value)}
          options={{ lineNumbers: true }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ width: '100%' }}
        />
        <Button variant="contained" onClick={runCode} style={{ marginTop: '10px' }}>Run</Button>
        <Paper
          style={{
            backgroundColor: '#282c34',
            color: 'white',
            padding: '10px',
            overflow: 'auto',
            maxHeight: '200px',
            marginTop: '10px',
          }}
        >
          <pre>{output}</pre>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default CodeCell;