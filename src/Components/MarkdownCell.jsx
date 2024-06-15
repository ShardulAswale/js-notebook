import React, { useState } from 'react';
import { Card, CardContent, TextareaAutosize } from '@mui/material';
import ToolbarComponent from './ToolBar';

const MarkdownCell = ({ cell, onChange, onDelete, onMoveUp, onMoveDown, onDuplicate }) => {
  const [isFocused, setIsFocused] = useState(false);

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
        <TextareaAutosize
          value={cell.content}
          onChange={(e) => onChange(cell.id, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ width: '100%', fontFamily: 'monospace', fontSize: '16px', padding: '8px', boxSizing: 'border-box' }}
          minRows={4}
        />
      </CardContent>
    </Card>
  );
};

export default MarkdownCell;