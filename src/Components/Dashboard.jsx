// Dashboard.jsx
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import CodeCell from './CodeCell';
import MarkdownCell from './MarkdownCell';
import DividerComponent from './DividerComponent';

const Dashboard = () => {
  const [cells, setCells] = useState([]);

  const addCodeCell = (index) => {
    const newCell = {
      id: generateId(),
      type: 'code',
      content: '',
    };
    const newCells = [
      ...cells.slice(0, index),
      newCell,
      ...cells.slice(index),
    ];
    setCells(newCells);
  };

  const addMarkdownCell = (index) => {
    const newCell = {
      id: generateId(),
      type: 'markdown',
      content: '',
    };
    const newCells = [
      ...cells.slice(0, index),
      newCell,
      ...cells.slice(index),
    ];
    setCells(newCells);
  };

  const deleteCell = (id) => {
    setCells(cells.filter((cell) => cell.id !== id));
  };

  const moveCellUp = (id) => {
    const index = cells.findIndex((cell) => cell.id === id);
    if (index > 0) {
      const newCells = [...cells];
      const temp = newCells[index];
      newCells[index] = newCells[index - 1];
      newCells[index - 1] = temp;
      setCells(newCells);
    }
  };

  const moveCellDown = (id) => {
    const index = cells.findIndex((cell) => cell.id === id);
    if (index < cells.length - 1) {
      const newCells = [...cells];
      const temp = newCells[index];
      newCells[index] = newCells[index + 1];
      newCells[index + 1] = temp;
      setCells(newCells);
    }
  };

  const duplicateCell = (id) => {
    const index = cells.findIndex((cell) => cell.id === id);
    if (index !== -1) {
      const newCell = { ...cells[index], id: generateId() };
      const newCells = [...cells.slice(0, index + 1), newCell, ...cells.slice(index + 1)];
      setCells(newCells);
    }
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <Container maxWidth="xl">
      <Box mt={3}>
        {cells.map((cell, index) => (
          <React.Fragment key={cell.id}>
            <DividerComponent
              index={index}
              addCodeCell={addCodeCell}
              addMarkdownCell={addMarkdownCell}
            />
            <Box my={2}>
              {cell.type === 'code' ? (
                <CodeCell
                  cell={cell}
                  onChange={(id, value) => {
                    const updatedCells = cells.map((c) => (c.id === id ? { ...c, content: value } : c));
                    setCells(updatedCells);
                  }}
                  onDelete={() => deleteCell(cell.id)}
                  onMoveUp={() => moveCellUp(cell.id)}
                  onMoveDown={() => moveCellDown(cell.id)}
                  onDuplicate={() => duplicateCell(cell.id)}
                />
              ) : (
                <MarkdownCell
                  cell={cell}
                  onChange={(id, value) => {
                    const updatedCells = cells.map((c) => (c.id === id ? { ...c, content: value } : c));
                    setCells(updatedCells);
                  }}
                  onDelete={() => deleteCell(cell.id)}
                  onMoveUp={() => moveCellUp(cell.id)}
                  onMoveDown={() => moveCellDown(cell.id)}
                  onDuplicate={() => duplicateCell(cell.id)}
                />
              )}
            </Box>
          </React.Fragment>
        ))}
        <DividerComponent
          index={cells.length}
          addCodeCell={addCodeCell}
          addMarkdownCell={addMarkdownCell}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
