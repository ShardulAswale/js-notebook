import React, { useState } from 'react';
import { Button, Card, CardContent, IconButton, Paper } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const handleChange = (value) => {
        setCode(value);
    };

    const runCode = () => {
        setOutput("")
        try {
            let capturedConsoleOutput = '';
            const originalConsoleLog = console.log;
            console.log = (message) => {
                capturedConsoleOutput += message + '\n';
                setOutput((prevOutput) => prevOutput + message + '\n');
            };
            const result = new Function(code)();
            console.log = originalConsoleLog;
            setOutput((prevOutput) => prevOutput + (result !== undefined ? result.toString() : ''));
        } catch (error) {
            setOutput(error.toString());
        }
    };

    return (
        <Card style={{ width: '100%', height: 'auto' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {/* Run Button Column */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '10px' }}>
                    <IconButton aria-label="delete"onClick={runCode}>
                        <PlayCircleIcon />
                    </IconButton>
                </div>
                {/* Code and Console Window Column */}
                <Paper style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '10px' }}>
                    {/* Code Window */}
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                        <CodeMirror
                            value={code}
                            extensions={[javascript()]}
                            onChange={(value) => handleChange(value)}
                            theme={oneDark}
                            options={{
                                lineNumbers: true,
                            }}
                            style={{ width: '100%', padding: '8px', fontFamily: 'monospace', fontSize: '16px', boxSizing: 'border-box' }}
                        />
                    </div>
                    {/* Console Window */}
                    <div style={{
                        backgroundColor: '#282c34',
                        color: 'white',
                        padding: '10px',
                        overflow: 'auto',
                        maxHeight: '50vh',
                        margin: '10px 0',
                        flexGrow: 1
                    }}>
                        <pre>{output}</pre>
                    </div>
                </Paper>
            </CardContent>
        </Card>
    );
};

export default CodeEditor;

